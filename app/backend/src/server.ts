import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import express from "express";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 8080;


app.use(express.json());

app.get('/api/', (req, res) => {
  res.send("Welcome!");
})
// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
