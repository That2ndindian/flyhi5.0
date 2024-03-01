const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('flight_data.db');


app.get('/carrentals', async (req, res) => {
  try {
    const pickupCity = req.query.pickupCity;

    // Fetch car rentals based on the pickupCity
    const query = 'SELECT * FROM rental_cars WHERE pickup_city = ?';
    db.all(query, [pickupCity], (err, carRentals) => {
      if (err) {
        console.error('Error fetching car rentals:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      res.json(carRentals);
    });
  } catch (error) {
    console.error('Error processing car rentals request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});app.get('/flights', (req, res) => {
  const { departure, arrival } = req.query;

  let query = `SELECT * FROM flights`;

  if (departure && arrival) {
    // If both departure and arrival are provided, apply the filter
    query += ` WHERE departure_airport = ? AND arrival_airport = ?`;
  }

  db.all(query, [departure, arrival], (err, filteredFlights) => {
    if (err) {
      console.error('Error fetching or filtering flights:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json(filteredFlights);
  });
});

app.get('/departureflights', (req, res) => {
    const query = `
        SELECT DISTINCT departure_airport
        FROM flights
        GROUP BY departure_airport
        ORDER by departure_airport ASC;
    `;

    db.all(query, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(rows);
        }
    });
});
app.get('/arrivalflights', (req, res) => {
    const query = `
        SELECT DISTINCT arrival_airport
        FROM flights
        GROUP BY arrival_airport
        ORDER by arrival_airport ASC;
    `;

    db.all(query, (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(rows);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
