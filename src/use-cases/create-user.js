import bcrypt from 'bcrypt'
import { randomUUID } from 'node:crypto'
import { PostgresCreateUserRepository } from '../repositories/postgres/create-user'
export class CreateUserUseCase {
  async execute(createUserParams) {
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

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
