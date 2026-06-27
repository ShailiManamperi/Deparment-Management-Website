const express = require('express');
require('./utils/db'); // connect DB

const app = express();

app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});