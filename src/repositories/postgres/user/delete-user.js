import { prisma } from '../../../../prisma/prisma.js'

export class PostgresDeleteUserByIdRepository {
  async execute(userId) {
    try {
      const deletedUser = await prisma.user.delete({
        where: {
          id: userId,
        },
      })

      return deletedUser
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
