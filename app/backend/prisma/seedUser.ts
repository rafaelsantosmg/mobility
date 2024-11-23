import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Criação de usuários de exemplo
  const user1 = await prisma.user.create({
    data: {
      email: "usuario1@teste.com",
      password: "senha123",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "usuario2@teste.com",
      password: "senha456",
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
