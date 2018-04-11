import knex from 'knex'
import restify from 'restify'
import inter_level from './utility/inter_level'
import { SERVFAIL } from 'dns';

const BASE_PATH = '/v1'

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: "./src/store.db"
  }
})

const queryOptions = {
  limit: 50,
  page: 1
}

export default function routes(app) {
  app.get(`${BASE_PATH}/:inter_level`, (req, res, next) => {
    let { query, params } = req
    let level = inter_level(params.inter_level)

    query = { ...queryOptions, ...query }

    // checks whether the inter_level function returned
    // and error, if so, respond the error.
    if (typeof level !== 'string') {
      res.send(level)
      return next()
    }

    let base = db('geo_code').where('inter_level', level)

    if (query.filter) {
      base.andWhere(function () {
        this.where('name', 'like', `%${query.filter}%`)
            .orWhere('code', 'like', `%${query.filter}%`)
      })
    }

    let final = base.clone()
    let offset = (query.page - 1) * query.limit

    final.limit(query.limit)
      .offset(offset)
      .then(result => {
        return base.count().then(count => {
          let total = count[0]['count(*)']
          let of = Math.ceil(total / query.limit)

          return res.send({
            page: parseInt(query.page),
            of,
            total,
            result
          })
        })
      })
  })

  app.get(`${BASE_PATH}`, (req, res, next) => {
    let serve = restify.plugins.serveStatic({
      directory: __dirname + '/../documentation',
      default: 'index.html'
    })

    serve(req, res, next)
  })

}