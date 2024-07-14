
import express from 'express';

const port = process.env.PORT || 8080;
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});