const express = require('express');
const db = require('../shared/db');

const app = express();
const port = 3000;

const serverData = {
    serverName: 'Server A',
    bgColor: '#ACC8E5',
    textColor: '#112A46'
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
  console.log(`Server A listening at http://localhost:${port}`);
});
