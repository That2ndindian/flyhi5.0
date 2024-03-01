import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'
const YourComponent = () => {
  const [selectedDeparture, setSelectedDeparture] = useState('');
  const [selectedArrival, setSelectedArrival] = useState('');
  const [arrivalAirports, setArrivalAirports] = useState([]);
  const [depAirports, setDepAirports] = useState([])
  const history = useNavigate()
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [passengerCount, setPassengerCount] = useState(1);
const handleSubmit = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/flights?departure=${selectedDeparture}&arrival=${selectedArrival}`);

    const flights = response.data;
    if (flights.length > 0) {
      console.log('Matching flights:', flights);
      history('/booking', { state: { flights } });
    } else {
      console.log('No matching flights found.');
      // Handle the case where no matching flights are found
    }
  } catch (error) {
    console.error('Error searching for flights:', error);
    // Handle errors, e.g., show an error message to the user
  }
};
  useEffect(() => {
    const fetchAriAirports = async () => {
      try {
        const response = await axios.get('http://localhost:8080/arrivalflights');
        setArrivalAirports(response.data);
      } catch (error) {
        console.error('Error fetching arrival airports:', error);
      }
    };

    const fetchDepAirports = async () => {
      try {
        const response2 = await axios.get('http://localhost:8080/departureflights');
        setDepAirports(response2.data);
      } catch (error) {
        console.error('Error fetching departure airports:', error);
      }
    };

    // Call your functions
    fetchDepAirports();
    fetchAriAirports();

  }
  ,


    []);
  return (
      <div>
          <label htmlFor="DepAirport">Select Departure Airport:</label>
          <select
              id="DepAirport"
              value={selectedDeparture}
              onChange={(e) => setSelectedDeparture(e.target.value)}
          >
              {depAirports.map((airport, index) => (
                  <option key={index} value={airport.departure_airport}>
                      {airport.departure_airport}
                  </option>
              ))}
          </select>

          <label htmlFor="arrivalAirport">Select Arrival Airport:</label>
          <select
              id="arrivalAirport"
              value={selectedArrival}
              onChange={(e) => setSelectedArrival(e.target.value)}
          >
              {arrivalAirports.map((airport, index) => (
                  <option key={index} value={airport.arrival_airport}>
                      {airport.arrival_airport}
                  </option>
              ))}
          </select>
          {/* Button for round trip */}
          <label htmlFor="roundTrip">Round Trip:</label>
          <input
            type="checkbox"
            id="roundTrip"
            checked={isRoundTrip}
            onChange={() => setIsRoundTrip(!isRoundTrip)}
  />

  {/* Input for the number of passengers */}
          <label htmlFor="passengerCount">Passengers:</label>
          <input
            type="number"
            id="passengerCount"
            value={passengerCount}
            onChange={(e) => setPassengerCount(e.target.value)}
  />

          <button onClick={handleSubmit}>Submit</button>
      </div>

  );
};

export default YourComponent;
