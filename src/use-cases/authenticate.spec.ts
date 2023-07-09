import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to authenticate', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    const email = 'johndoe@email.com'
    const password = 'abc123'

    await usersRepository.create({
      name: 'John Doe',
      password_hash: await hash(password, 6),
      email,
    })

    const { user } = await sut.execute({
      email,
      password,
    })
    expect(user.id).toEqual(expect.any(String))
  })
  it('should not be able to authenticate with wrong e-mail', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    const email = 'johndoe@email.com'
    const password = 'abc123'

    expect(async () => {
      await sut.execute({
        email,
        password,
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it('should not be able to authenticate with wrong password', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(usersRepository)

    const email = 'johndoe@email.com'
    const password = 'abc123'

    await usersRepository.create({
      name: 'John Doe',
      password_hash: await hash(password, 6),
      email,
    })

    expect(async () => {
      await sut.execute({
        email,
        password: '123123',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
