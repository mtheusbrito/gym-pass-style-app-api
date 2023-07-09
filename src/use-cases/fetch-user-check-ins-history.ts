import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

type FetchUserCheckInsUseCaseRequest = {
  userId: string
  page: number
}
type FetchUserCheckInsUseCaseResponse = {
  checkIns: CheckIn[]
}

class FetchUserCheckInsUseCase {
  constructor(private checkInsReposity: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsUseCaseRequest): Promise<FetchUserCheckInsUseCaseResponse> {
    const checkIns = await this.checkInsReposity.findManyByUserId(userId, page)

    return { checkIns }
  }
}

export { FetchUserCheckInsUseCase }
