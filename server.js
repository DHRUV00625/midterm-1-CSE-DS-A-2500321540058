const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

const FILE = './books.json';
const readData = () => JSON.parse(fs.readFileSync(FILE, 'utf8'));
const writeData = (data) => fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

app.get('/books', (req, res) => {
  res.json(readData());
});

app.post('/books', (req, res) => {
  const books = readData();
  books.push(req.body);
  writeData(books);
  res.json({ status: 'Added' });
});

app.put('/books/:id', (req, res) => {
  const books = readData().map(b => b.id === req.params.id ? req.body : b);
  writeData(books);
  res.json({ status: 'Updated' });
});

app.delete('/books/:id', (req, res) => {
  const books = readData().filter(b => b.id !== req.params.id);
  writeData(books);
  res.json({ status: 'Deleted' });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));