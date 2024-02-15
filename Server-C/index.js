const express = require('express');
const db = require('../shared/db');

const app = express();
const port = 3002;

const serverData = {
    serverName: 'Server C',
    bgColor: '#1D1A2A',
    textColor: '#D0A7BC'
  };

app.get('/', (req, res) => {
  db.updateLoginCount('A', (err, loadData) => {
    if (err) {
      res.status(500).send('Error updating login count');
    } else {
      const responseData = { ...serverData, ...loadData };
      res.json(responseData);
    }
  });
});

app.listen(port, () => {
  console.log(`Server C listening at http://localhost:${port}`);
});
