import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in'
import { randomUUID } from 'crypto'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase
describe('Register Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInsRepository)
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId: randomUUID(),
      userId: randomUUID(),
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('should not be able to check in the same day', async () => {
    const gymId = randomUUID()
    const userId = randomUUID()
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    await sut.execute({
      gymId,
      userId,
    })

    await expect(async () => {
      await sut.execute({
        gymId,
        userId,
      })
    }).rejects.toBeInstanceOf(Error)
  })
  it('should be able to check in twice but in different days', async () => {
    const gymId = randomUUID()
    const userId = randomUUID()
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await sut.execute({
      gymId,
      userId,
    })
    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))
    const { checkIn } = await sut.execute({
      gymId,
      userId,
    })
    expect(checkIn.id).toEqual(expect.any(String))
  })
})
