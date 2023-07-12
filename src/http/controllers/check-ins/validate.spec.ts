import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAuthenticateUser } from '@/utils/test/create-end-authenticate-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Validate Check-in e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to validate a check-ins', async () => {
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

    const checkIn = await prisma.checkIn.create({
      data: {
        gym_id: gym.id,
        user_id: user!.id,
      },
    })
    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()
    expect(response.statusCode).toEqual(204)

    const checkInValidated = await prisma.checkIn.findFirstOrThrow({
      where: {
        id: checkIn.id,
      },
    })
    expect(checkInValidated.validated_at).toEqual(expect.any(Date))
  })
})
