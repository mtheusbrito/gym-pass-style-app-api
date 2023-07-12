import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAuthenticateUser } from '@/utils/test/create-end-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('History Check-Ins e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to list the history of check-ins', async () => {
    const { token } = await createAuthenticateUser(app)
    const user = await prisma.user.findFirst()
    const gym = await prisma.gym.create({
      data: {
        title: 'JavaScript Gym',
        description: 'Some description',
        phone: '11 9999999999',
        latitude: 21.1997556,
        longitude: -41.9105272,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          gym_id: gym.id,
          user_id: user!.id,
        },
        {
          gym_id: gym.id,
          user_id: user!.id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()
    expect(response.statusCode).toEqual(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user!.id,
      }),
      expect.objectContaining({
        gym_id: gym.id,
        user_id: user!.id,
      }),
    ])
  })
})
