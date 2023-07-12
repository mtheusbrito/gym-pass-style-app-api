import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAuthenticateUser(app: FastifyInstance) {
  await request(app.server).post('/users').send({
    name: 'John Doe',
    email: 'johndow@gmail.com',
    password: 'abc123',
  })

  const response = await request(app.server).post('/users/sessions').send({
    email: 'johndow@gmail.com',
    password: 'abc123',
  })

  const { token } = response.body

  return { token }
}
