export class DeleteUserUseCase {
  constructor(deleteUserByIdRepository) {
    this.deleteUserByIdRepository = deleteUserByIdRepository
  }
  async execute(userId) {
    const deleteUser = await this.deleteUserByIdRepository.execute(userId)

    return deleteUser
  }
}
