import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-reposiroty'
import { SearchGymsUseCase } from '../search-gyms'

export function makeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  return new SearchGymsUseCase(gymsRepository)
}
