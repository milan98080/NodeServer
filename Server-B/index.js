const express = require('express');
const db = require('../shared/db');

const app = express();
const port = 3001;

const serverData = {
    serverName: 'Server B',
    bgColor: '#051323',
    textColor: '#4EBB2D'
  };

app.get('/', (req, res) => {
  db.updateLoginCount('B', (err, loadData) => {
    if (err) {
      res.status(500).send('Error updating login count');
    } else {
      const responseData = { ...serverData, ...loadData };
      res.json(responseData);
    }
  });
});

app.listen(port, () => {
  console.log(`Server B listening at http://localhost:${port}`);
});
