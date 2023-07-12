import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAuthenticateUser } from '@/utils/test/create-end-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Check-In e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to create check-in', async () => {
    const { token } = await createAuthenticateUser(app)

    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '11 9999999999',
        latitude: 21.1997556,
        longitude: -41.9105272,
      },
    })

    const response = await request(app.server)
      .post('/check-ins')
      .set('Authorization', `Bearer ${token}`)
      .send({
        gymId: gym.id,
        latitude: 21.1997556,
        longitude: -41.9105272,
      })
    expect(response.statusCode).toEqual(201)
  })
})
