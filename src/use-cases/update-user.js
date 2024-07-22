import { EmailAlrealInUseError } from '../errors/user'
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email'
import bcrypt from 'bcrypt'
import { PostgresUpdateUserRepository } from '../repositories/postgres/update-user'
export class UpdateUserUseCase {
  async execute(userId, updateUserParams) {
    if (updateUserParams.email) {
      const postgresGetUserByEmailRepository =
        new PostgresGetUserByEmailRepository()
      const userWithProvidedEmail =
        await postgresGetUserByEmailRepository.execute(updateUserParams.email)

      if (userWithProvidedEmail) {
        throw new EmailAlrealInUseError(updateUserParams.email)
      }
    }

    const user = { ...updateUserParams }

    if (updateUserParams.password) {
      const hashedPassword = await bcrypt.hash(updateUserParams.password, 10)

      user.password = hashedPassword
    }

    const postgresUpdateUserRepository = new PostgresUpdateUserRepository()
    const updateUser = await postgresUpdateUserRepository.execute(userId, user)

    return updateUser
  }
}
