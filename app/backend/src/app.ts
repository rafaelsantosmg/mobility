import cors from 'cors';
import express from 'express';
import handleError from './middlewares/handleError';
import router from './routes/routes';

const app = express();

app.use(cors({
  origin: ["http://localhost:80"],
  credentials: true,
}));

app.use(express.json());

app.use(router);

app.use(handleError);

export default app;
