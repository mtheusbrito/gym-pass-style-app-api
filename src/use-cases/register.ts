import { prisma } from '@/lib/prisma'
import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'

type RegisterUseCaseRequest = {
  name: string
  email: string
  password: string
}
export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists!')
  }
  const usersRepository = new UsersRepository()
  await usersRepository.create({ name, email, password_hash })
}
