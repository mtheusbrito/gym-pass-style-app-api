import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'

export async function userRoutes(app: FastifyInstance) {
  app.post('/', register)

  app.post('/sessions', authenticate)

  // Authenticated

  app.get('/me', { onRequest: verifyJWT }, profile)
}
