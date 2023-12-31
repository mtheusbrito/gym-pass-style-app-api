import { PrismaCheckInsRepository } from '@/repositories/prisma/prisma-check-ins-repository'
import { FetchUserCheckInsUseCase } from '../fetch-user-check-ins-history'

export function makeFetchUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  return new FetchUserCheckInsUseCase(checkInsRepository)
}
