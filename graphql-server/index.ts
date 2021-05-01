import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  const allCandidates = await prisma.candidates.findMany()
  console.log(allCandidates)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })