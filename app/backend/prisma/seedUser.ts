import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Criação de usuários de exemplo
  const user1 = await prisma.user.create({
    data: {
      name: "usuario1",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "usuario2",
    },
  });

  console.log("Usuários criados:", user1, user2);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
