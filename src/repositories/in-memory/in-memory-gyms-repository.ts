import { Gym, Prisma } from '.prisma/client'
import { GymsRepository } from '../gyms-repository'
import { randomUUID } from 'crypto'
import { Decimal } from '@prisma/client/runtime'

class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)
    if (!gym) {
      return null
    }
    return gym
  }

  async create(data: Prisma.GymUncheckedCreateInput) {
    const newItem: Gym = {
      ...data,
      id: randomUUID(),
      description: data.description || '',
      phone: data.phone || '',
      latitude: new Decimal(String(data.latitude)),
      longitude: new Decimal(String(data.longitude)),
    }
    this.items.push(newItem)
    return newItem
  }
}

export { InMemoryGymsRepository }
