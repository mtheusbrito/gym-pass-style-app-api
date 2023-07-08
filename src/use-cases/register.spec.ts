import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { test, expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
  it('should hash user passwrod upom registration', async () => {
    const prismaRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe2@email.com',
      password: 'abc123',
    })

    const isPasswordCorrectlyHashed = await compare(
      'abc123',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
})
test('check if it works', () => {
  expect(2 + 2).toBe(4)
})
