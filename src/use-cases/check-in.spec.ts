import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { randomUUID } from 'crypto'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase
const lat = 21.1997556
const lon = -41.9105272
let gymId: string = ''
const userId = randomUUID()

describe('Check In Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInsRepository, gymsRepository)
    vi.useFakeTimers()

    const gym = await gymsRepository.create({
      latitude: lat,
      longitude: lon,
      title: 'My Gym',
      description: '',
      phone: '',
    })
    gymId = gym.id
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId,
      gymId,
      userLatitude: lat,
      userLongitude: lon,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      userId,
      gymId,
      userLatitude: lat,
      userLongitude: lon,
    })

    await expect(async () => {
      await sut.execute({
        userId,
        gymId,
        userLatitude: lat,
        userLongitude: lon,
      })
    }).rejects.toBeInstanceOf(Error)
  })
  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      userId,
      gymId,
      userLatitude: lat,
      userLongitude: lon,
    })
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    const { checkIn } = await sut.execute({
      userId,
      gymId,
      userLatitude: lat,
      userLongitude: lon,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in on distant gym', async () => {
    const gym = await gymsRepository.create({
      id: gymId,
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-21.201587),
      longitude: new Decimal(-41.9039643),
    })

    expect(async () => {
      await sut.execute({
        userId,
        gymId: gym.id,
        userLatitude: lat,
        userLongitude: lon,
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
