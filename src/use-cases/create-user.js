import bcrypt from 'bcrypt'
import { randomUUID } from 'node:crypto'

import { EmailAlreadyInUseError } from '../errors/user.js'
export class CreateUserUseCase {
  constructor(createUserRepository, getUserByEmailRepository) {
    this.createUserRepository = createUserRepository
    this.getUserByEmailRepository = getUserByEmailRepository
  }
  async execute(createUserParams) {
    const hashedPassword = await bcrypt.hash(createUserParams.password, 10)

    const userWithProvidedEmail = await this.getUserByEmailRepository.execute(
      createUserParams.email,
    )

    if (userWithProvidedEmail) {
      throw new EmailAlreadyInUseError(createUserParams.email)
    }

    const user = {
      ...createUserParams,
      id: randomUUID(),
      password: hashedPassword,
    }

    const createUser = await this.createUserRepository.execute(user)

    return createUser
  }
}
