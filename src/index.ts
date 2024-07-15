
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';
import MeiliSearch from 'meilisearch';

const port = process.env.PORT || 8080;
const app = express();

const prisma = new PrismaClient();
const redis = createClient();
const meilisearch = new MeiliSearch({
  host: 'http://127.0.0.1:7700',
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});