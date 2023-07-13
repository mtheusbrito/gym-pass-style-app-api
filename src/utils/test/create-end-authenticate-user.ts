import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'johndow@gmail.com',
      password_hash: await hash('abc123', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const response = await request(app.server).post('/users/sessions').send({
    email: 'johndow@gmail.com',
    password: 'abc123',
  })

  const { token } = response.body

  return { token }
}
