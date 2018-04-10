import server from './src/server'
import dotenv from 'dotenv'
import env from './src/utility/env'
import routes from './src/routes'

dotenv.config()

global.env = env

const app = server()

app.configure(app => routes(app))

app.boot()