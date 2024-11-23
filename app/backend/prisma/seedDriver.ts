import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const drivers = [
    {
      name: "Homer Simpson",
      description: "Olá! Sou o Homer, seu motorista camarada! Relaxe e aproveite o passeio, com direito a rosquinhas e boas risadas (e talvez alguns desvios).",
      carName: "Plymouth Valiant 1973 rosa e enferrujado",
      evaluation: "2/5 Motorista simpático, mas errou o caminho 3 vezes. O carro cheira a donuts.",
      rate: "R$2,50/km",
      kmMinimum: 1,
    },
    {
      name: "Dominic Toretto",
      description: "Ei, aqui é o Dom. Pode entrar, vou te levar com segurança e rapidez ao seu destino. Só não mexa no rádio, a playlist é sagrada.",
      carName: "Dodge Charger R/T 1970 modificado",
      evaluation: "4/5 Que viagem incrível! O carro é um show à parte e o motorista, apesar de ter uma cara de poucos amigos, foi super gente boa. Recomendo!",
      rate: "R$5,00/km",
      kmMinimum: 5,
    },
    {
      name: "James Bond",
      description: "Boa noite, sou James Bond. À seu dispor para um passeio suave e discreto. Aperte o cinto e aproveite a viagem.",
      carName: "Aston Martin DB5 clássico",
      evaluation: "5/5 Serviço impecável! O motorista é a própria definição de classe e o carro é simplesmente magnífico. Uma experiência digna de um agente secreto.",
      rate: "R$10,00/km",
      kmMinimum: 10,
    },
  ];

  for (const driver of drivers) {
    const createdDriver = await prisma.driver.create({ data: driver });
    console.log("Driver created:", createdDriver);
  }
}

main()
  .catch((e) => {
    console.error("Error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
