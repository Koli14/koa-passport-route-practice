import passport from 'koa-passport'
import pl from 'passport-local'

const { Strategy: LocalStrategy } = pl

const auth = () => {
  const fetchUser = (() => {
    const user = { id: 1, username: 'test', password: 'test' }
    return async () => {
      return user
    }
  })()

  passport.serializeUser((user, done) => { done(null, user.id) })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await fetchUser()
      done(null, user)
    } catch (err) {
      done(err)
    }
  })

  passport.use(new LocalStrategy((username, password, done) => {
    fetchUser()
      .then(user => {
        if (username === user.username && password === user.password) {
          done(null, user)
        } else {
          done(null, false)
        }
      })
      .catch((err) => { done(err) })
  }))
}

export default auth
