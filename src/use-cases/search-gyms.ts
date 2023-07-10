import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

type SearchGymsUseCaseRequest = {
  query: string
  page: number
}

type SearchGymsUseCaseResponse = {
  gyms: Gym[]
}

class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)
    return { gyms }
  }
}
export { SearchGymsUseCase }
