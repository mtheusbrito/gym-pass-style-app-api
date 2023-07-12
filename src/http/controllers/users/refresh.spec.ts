import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to refresh token ', async () => {
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
    const cookies = await authResponse.get('Set-Cookie')
    const response = await request(app.server)
      .patch('/users/token/refresh')
      .set('Cookie', cookies)

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
