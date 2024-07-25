import { PostgresDeleteUserByIdRepository } from '../repositories/postgres/index.js'

export class DeleteUserUseCase {
  async execute(userId) {
    const postgresDeleteUserByIdRepository =
      new PostgresDeleteUserByIdRepository()
    const deleteUser = await postgresDeleteUserByIdRepository.execute(userId)

    return deleteUser
  }
}
