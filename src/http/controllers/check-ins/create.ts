import { makeCreateCheckInUseCase } from '@/use-cases/factories/make-create-check-in-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const userId = request.user.sub
  const createCheckInBodySchema = z.object({
    gymId: z.string(),
    latitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude, longitude, gymId } = createCheckInBodySchema.parse(
    request.body,
  )

  const makeCheckInUseCase = makeCreateCheckInUseCase()
  await makeCheckInUseCase.execute({
    userLatitude: latitude,
    userLongitude: longitude,
    gymId,
    userId,
  })

  return reply.status(201).send()
}
