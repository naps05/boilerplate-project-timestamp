// server.js
// where your node app starts

// init project
const express = require('express');
const cors = require('cors');
const app = express();

// enable CORS (so FCC can test it remotely)
app.use(cors({ optionsSuccessStatus: 200 }));

// static files (optional, for landing page)
app.use(express.static('public'));

// index page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// === Timestamp API ===
app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;

  let date;

  // Case 1: no date provided → current time
  if (!dateParam) {
    date = new Date();
  } 
  // Case 2: number string → treat as unix (milliseconds)
  else if (/^-?\d+$/.test(dateParam)) {
    date = new Date(parseInt(dateParam));
  } 
  // Case 3: regular date string
  else {
    date = new Date(dateParam);
  }

  // Check if valid date
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Success response
  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
