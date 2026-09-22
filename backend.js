const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let latestDistance = 18.0; // Default distance

// ESP32 se data lene ke liye
app.post('/api/sensor', (req, res) => {
  if (req.body.distance !== undefined) {
    latestDistance = parseFloat(req.body.distance);
    console.log("ESP32 Sensor Reading:", latestDistance, "cm");
  }
  res.json({ status: 'ok' });
});

// Website ko data dene ke liye
app.get('/api/sensor', (req, res) => {
  res.json({ distance: latestDistance });
});

app.listen(3000, () => console.log("Server ready on port 3000!"));
