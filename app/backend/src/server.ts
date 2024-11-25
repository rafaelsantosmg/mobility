import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const prisma = new PrismaClient();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
