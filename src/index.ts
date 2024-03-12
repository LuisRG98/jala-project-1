import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';


import { randomBytes } from 'crypto';

const app = express();
const port = 3000;


app.use(bodyParser.json());


const secrets: { [key: string]: string } = {};



function generateSecretKey(): string {
  return randomBytes(4).toString('hex');
}


app.post('/api/secret', (req: Request, res: Response) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }
  const secretKey = generateSecretKey();
  secrets[secretKey] = message;
  res.status(201).json({ secretKey });
});


app.get('/api/secret/:secretKey', (req: Request, res: Response) => {
  const { secretKey } = req.params;
  if (!secrets.hasOwnProperty(secretKey)) {
    return res.status(404).json({ error: 'Secret not found' });
  }

  const secretMessage = secrets[secretKey];
  res.json({ secretMessage });
  delete secrets[secretKey];
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
