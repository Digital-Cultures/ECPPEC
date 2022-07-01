import { PrismaClient } from '@prisma/client'

export interface Context {
  prisma: PrismaClient
}

const prisma = new PrismaClient(
//   {  log: [
//   {
//     emit: "event",
//     level: "query",
//   },
// ],}
)

// prisma.$on("query", async (e) => {
//   console.log(`${e.query} ${e.params}`)
// });

export const context: Context = {
  prisma: prisma,
}