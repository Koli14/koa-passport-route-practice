import Router from '@koa/router'
import passport from 'koa-passport'

const router = new Router()

router.get('/', async (ctx) => {
  ctx.body = 'Hello Home'
})

router.post('/custom', async (ctx) => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (user === false) {
      ctx.body = { success: false }
      ctx.throw(401)
    } else {
      ctx.body = { success: true }
      return ctx.login(user)
    }
  })(ctx)
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/app',
    failureRedirect: '/'
  })
)

router.get('/logout', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout()
    ctx.redirect('/')
  } else {
    ctx.body = { success: false }
    ctx.throw(401)
  }
})

router.get('/app', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.body = 'Hello APP!'
  } else {
    ctx.body = { success: false }
    ctx.throw(401)
  }
})

export default router
