import { PostgresDeleteUserByIdRepository } from '../repositories/postgres'

export class DeleteUserUseCases {
  async execute(userId) {
    const postgresDeleteUserByIdRepository =
      new PostgresDeleteUserByIdRepository()
    const deleteUser = await postgresDeleteUserByIdRepository.execute(userId)

    return deleteUser
  }
}
