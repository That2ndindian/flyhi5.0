import React, {useState} from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import axios from 'axios';

function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
const BookingPage = () => {
  const [selectedRentalCar, setSelectedRentalCar] = useState(null);
  const location = useLocation()
  const{flights} = location.state

  const handleSelectRentalCar = (rentalCar) => {
    setSelectedRentalCar(rentalCar);
  };
  // Use the useLocation hook to get access to the location state
  const [rentalCars, setRentalCar] = useState([]);
  const history = useNavigate()

  const handleSubmit = async (selectedFlight) => {
    // Do any necessary actions before navigating to the payments page
    console.log('Submit button clicked!');

    // Prompt user for car rental confirmation
    const wantRentalCar = window.confirm('Do you want to add a rental car to your booking?');

    // If user wants a rental car, show options; otherwise, go to payments directly
    if (wantRentalCar) {
       try {
      // Fetch rental cars based on the selected flight
      const response = await axios.get(`http://localhost:8080/rentalCars`);
      const allRentalCars = response.data;

      // Filter rental cars based on pickupcity matching arrival_airport
      const filteredRentalCars = allRentalCars.filter(
        (rentalCar) => rentalCar.pickup_city === selectedFlight.arrival_airport
      );
      setRentalCar(filteredRentalCars);
    } catch (error) {
      console.error('Error fetching rental cars:', error);
    }
      // Show rental car options
      console.log('User wants a rental car. Show options or navigate to /carrentals.');

      // You can add more logic here to handle rental car options
      // For now, let's navigate to /carrentals
      history('/CarRentalsPage',{selectedFlight});
    } else {
      // User doesn't want a rental car, navigate to payments
      history('/Payments');
    }
  };
  return (
      <div>
        <h2>Booking Information</h2>
        <table>
          <thead>
          <tr>
            <th>Departure Airport</th>
            <th>Arrival Airport</th>
            <th>Price</th>
            <th>Flight Departure Date</th>
          </tr>
          </thead>
          <tbody>
          {flights.map((flight, index) => (
              <tr key={index}>
                <td>{flight.departure_airport}</td>
                <td>{flight.arrival_airport}</td>
                <td>{flight.flight_price}</td>
                <td>{flight.departure_date}</td>
                <td>
                  {/* Add a Select button for each flight */}
                  <button onClick={handleSubmit}>Select</button>
                </td>
              </tr>

          ))}
          </tbody>
        </table>
        <button onClick={handleSubmit}>Submit</button>
      </div>
  );
};

export default BookingPage;