import restify from 'restify'

export default function () {
  let server = restify.createServer()

  server.use(restify.plugins.fullResponse())
  server.use(restify.plugins.acceptParser(server.acceptable))
  server.use(restify.plugins.queryParser())
  server.use(restify.plugins.bodyParser())
  server.use(restify.plugins.authorizationParser())

  return {
    server,
    configure: function configure(callback) {
      callback(server)
    },
    boot: function boot() {
      server.listen(env('SERVER_PORT'))
      server.on('listening', () => {
        console.log(`[${env('SERVER_NAME')}] running on ${env('SERVER_HOST')}:${env('SERVER_PORT')}`)
      });
    }
  };
}
