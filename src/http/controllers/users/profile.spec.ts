import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to get user profile', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndow@gmail.com',
      password: 'abc123',
    })

    const authResponse = await request(app.server)
      .post('/users/sessions')
      .send({
        email: 'johndow@gmail.com',
        password: 'abc123',
      })
    const { token } = authResponse.body

    const profileResponse = await request(app.server)
      .get('/users/me')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'johndow@gmail.com',
      }),
    )
  })
})
