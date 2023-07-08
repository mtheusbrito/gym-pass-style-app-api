import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
  it('should hbe able to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'abc123',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should hash user passwrod upom registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: 'abc123',
    })

    const isPasswordCorrectlyHashed = await compare(
      'abc123',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
  it('should not bee able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'johndoe@email.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: 'abc123',
    })
    expect(async () => {
      await registerUseCase.execute({
        name: 'John Doe',
        email,
        password: 'abc123',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
