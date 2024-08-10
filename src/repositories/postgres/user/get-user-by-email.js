import { prisma } from '../../../../prisma/prisma.js'
// import { PostgresHelper } from '../../../db/postgres/helper.js'

export class PostgresGetUserByEmailRepository {
  async execute(email) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    })
    // const user = await PostgresHelper.query(
    //   'SELECT * FROM User WHERE email = $1',
    //   [email]
    // )

    // return user[0]
  }
}
