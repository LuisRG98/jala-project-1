import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import secretsRouter from "./controllers/secretsController";

dotenv.config();

const app = express();
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

// Middlewares
app.use(bodyParser.json());

// Routes
app.use("/api/secrets", secretsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
