import { CheckInsRepository } from '@/repositories/check-ins-repository'

type GetUserMetricsUseCaseRequest = {
  userId: string
}
type GetUserMetricsUseCaseResponse = {
  checkInsCount: number
}

class GetUserMetricsUseCase {
  constructor(private checkInsReposity: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsReposity.countByUserId(userId)

    return { checkInsCount }
  }
}

export { GetUserMetricsUseCase }
