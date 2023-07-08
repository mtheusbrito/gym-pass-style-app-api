import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'crypto'

class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []
  async findByEmail(email: String) {
    const user = this.items.find((item) => item.email === email)
    if (!user) {
      return null
    }
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const newItem: User = {
      ...data,
      id: randomUUID(),
      created_at: new Date(),
    }
    this.items.push(newItem)
    return newItem
  }
}

export { InMemoryUsersRepository }
