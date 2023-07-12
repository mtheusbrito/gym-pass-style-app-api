import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { refresh } from './refresh'

export async function userRoutes(app: FastifyInstance) {
  app.post('/', register)

  app.post('/sessions', authenticate)

  // Authenticated
  app.patch('/token/refresh', refresh)
  app.get('/me', { onRequest: verifyJWT }, profile)
}
