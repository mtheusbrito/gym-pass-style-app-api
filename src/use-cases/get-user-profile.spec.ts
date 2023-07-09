import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { randomUUID } from 'crypto'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase
describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })
  it('should be able to get user profile', async () => {
    const email = 'johndoe@email.com'
    const password = 'abc123'

    const createdUser = await usersRepository.create({
      name: 'John Doe',
      password_hash: await hash(password, 6),
      email,
    })

    const { user } = await sut.execute({ userId: createdUser.id })
    expect(user.name).toEqual('John Doe')
  })
  it('should not be able to user profile with wrong id', async () => {
    await expect(async () => {
      await sut.execute({
        userId: randomUUID(),
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
