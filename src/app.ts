import fastify from 'fastify'
import { userRoutes } from './http/controllers/users/routes'
import { ZodError } from 'zod'
import { env } from './env'
import blippPlugin from 'fastify-blipp'
import fastifyJwt from '@fastify/jwt'
import { gymRoutes } from './http/controllers/gyms/routes'
import { checkInsRoutes } from './http/controllers/check-ins/routes'
import fastifyCookie from '@fastify/cookie'
export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
})
app.register(fastifyCookie)
app.register(blippPlugin)
app.register(userRoutes, { prefix: 'users' })
app.register(gymRoutes, { prefix: 'gyms' })
app.register(checkInsRoutes, { prefix: 'check-ins' })

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }
  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    // TODO: Here we should log to on external tool like DataDog/NewRelic/Sentry
  }
  return reply.status(500).send({ message: 'Internal server error.' })
})
