
import dotenv from 'dotenv';
import express from 'express';

import { Logger } from './logger.js';

// Load .env file
dotenv.config();

const port = process.env.MOSAICIFY_PORT || 8080;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  Logger.info(`Listening on port: ${port}`);
});