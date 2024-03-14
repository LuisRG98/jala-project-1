import { Request, Response, Router } from "express";
import { generateSecretKey, secrets } from "../utils/index";

const secretsRouter = Router();

secretsRouter.post("/", (req: Request, res: Response) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  const secretKey = generateSecretKey();
  secrets[secretKey] = message;
  res.status(201).json({ secretKey });
});

secretsRouter.get("/:secretKey", (req: Request, res: Response) => {
  const { secretKey } = req.params;
  if (!Object.prototype.hasOwnProperty.call(secrets, secretKey)) {
    return res.status(404).json({ error: "Secret not found" });
  }

  const secretMessage = secrets[secretKey];
  res.json({ secretMessage });
  delete secrets[secretKey];
});

export default secretsRouter;
