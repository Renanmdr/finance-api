import bcrypt from 'bcrypt'
import { randomUUID } from 'node:crypto'
import {
  PostgresCreateUserRepository,
  PostgresGetUserByEmailRepository,
} from '../repositories/postgres/index.js'

import { EmailAlreadyInUseError } from '../errors/user.js'
export class CreateUserUseCase {
  async execute(createUserParams) {
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

    const postgresGetUserByEmailRepository =
      new PostgresGetUserByEmailRepository()
    const userWithProvidedEmail =
      await postgresGetUserByEmailRepository.execute(createUserParams.email)

    if (userWithProvidedEmail) {
      throw new EmailAlreadyInUseError(createUserParams.email)
    }

    const user = {
      ...createUserParams,
      id: randomUUID(),
      password: hashedPassword,
    }

    const postgresCreateUserRepository = new PostgresCreateUserRepository()

    const createUser = await postgresCreateUserRepository.execute(user)

    return createUser
  }
}
