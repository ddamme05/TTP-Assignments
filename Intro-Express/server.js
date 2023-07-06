const express = require('express');
const app = express();
const port = 4000;

const data = [
  { id: 1, name: 'Car', description: 'Vroom' },
  { id: 2, name: 'House', description: 'Where a person lives; unaffordable.' },
  { id: 3, name: 'Computer', description: 'Cool thing.' },
];

app.use((req, res, next) => {
  res.on('finish', () => {
    // the 'finish' event will be emitted when the response is handed over to the OS
    console.log(`Request: ${req.method} ${req.originalUrl} ${res.statusCode}`);
  });
  next();
});

app.use(express.json());

function getNextIdFromCollection(collection) {
  if (collection.length === 0) return 1;
  const lastRecord = collection[collection.length - 1];
  return lastRecord.id + 1;
}

app.get('/', (req, res) => {
  res.send('Welcome to the Data API!');
});

// List all data
app.get('/data', (req, res) => {
  res.send(data);
});

app.post('/data', (req, res) => {
  const newData = req.body;
  newData.id = getNextIdFromCollection(data);
  data.push(newData);
  res.status(201).send(newData);
});

// Get a specific data item
app.get('/data/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = data.find((item) => item.id === itemId);
  if (item) {
    res.send(item);
  } else {
    res.status(404).send({ message: 'Item not found' });
  }
});

// Update a specific data item
app.put('/data/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedData = req.body;
  const itemIndex = data.findIndex((item) => item.id === itemId);
  if (itemIndex !== -1) {
    data[itemIndex] = {
      ...data[itemIndex],
      ...updatedData
    };
    res.send(data[itemIndex]);
  } else {
    res.status(404).send({ message: 'Item not found' });
  }
});

// Delete a specific data item
app.delete('/data/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const itemIndex = data.findIndex((item) => item.id === itemId);
  if (itemIndex !== -1) {
    const deletedItem = data.splice(itemIndex, 1);
    res.send(deletedItem[0]);
  } else {
    res.status(404).send({ message: 'Item not found' });
  }
});

app.use((req, res) => {
  res.status(404).send({ message: 'Invalid route' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
