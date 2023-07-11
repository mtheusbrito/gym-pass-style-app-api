import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate e2e', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })
  it('should be able to authenticate an user ', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndow@gmail.com',
      password: 'abc123',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndow@gmail.com',
      password: 'abc123',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
