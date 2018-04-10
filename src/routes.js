import knex from 'knex'
import inter_level from './utility/inter_level'

const BASE_PATH = '/v1'

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: "./src/store.db"
  }
})

export default function routes(app) {
  app.get(`${BASE_PATH}/:inter_level`, (req, res, next) => {
    let { query, params } = req
    let level = inter_level(params.inter_level)

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

    base.then(result => {
      return base.count().then(count => {
        return res.send({
          total: count[0]['count(*)'],
          result
        })
      })
    })
  })
}