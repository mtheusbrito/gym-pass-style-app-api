import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-reposiroty'
import { SearchGymsUseCase } from '../search-gyms'

export function makeSerchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  return new SearchGymsUseCase(gymsRepository)
}
