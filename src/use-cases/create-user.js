import bcrypt from 'bcrypt'
import { randomUUID } from 'node:crypto'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user.js'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js'
export class CreateUserUseCase {
  async execute(createUserParams) {
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

    const postgresGetUserByEmailRepository =
      new PostgresGetUserByEmailRepository()
    const userWithProvidedEmail =
      await postgresGetUserByEmailRepository.execute(createUserParams.email)

    if (userWithProvidedEmail) {
      throw new Error('The provided e-mail is already in use')
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
