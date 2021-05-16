import Koa from 'koa'
import session from 'koa-session'
import bodyParser from 'koa-bodyparser'
import passport from 'koa-passport'
import auth from './auth.js'
import routes from './routes.js'

const app = new Koa()
app.keys = ['your-session-secret']
app.use(session({}, app))
app.use(bodyParser())

auth()
app.use(passport.initialize())
app.use(passport.session())

app.use(routes.routes())

const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server listening on', port))
