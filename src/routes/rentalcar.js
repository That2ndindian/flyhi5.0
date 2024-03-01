import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
const CarRentalsPage = () => {
    let navigate = useNavigate()
    // Replace this with your static car rentals data
    const staticCarRentals = [
        {id: 1, car_type: 'Sedan', price: 50},
        {id: 2, car_type: 'SUV', price: 70},
        // Add more static car rental data as needed
    ];
    const [selectedCar, setSelectedCar] = useState(null)

    const handleSelectCar = (car) => {
    setSelectedCar(car);
  };

    const handleNavigateToPayments = () => {
    if (selectedCar) {
      // Add any logic you need before navigating to the Payments page
      console.log('Selected Car:', selectedCar);

      // Navigate to the Payments page
      navigate('/Payments');
    } else {
      // Inform the user to select a car before proceeding
      alert('Please select a car before proceeding to payment.');
    }
  };

    return (
    <div>
      <h2>Car Rentals for Arrival </h2>
      <ul>
        {staticCarRentals.map((carRental) => (
          <li key={carRental.id}>
            <input
              type="radio"
              id={`car-${carRental.id}`}
              name="selectedCar"
              value={carRental.id}
              checked={selectedCar && selectedCar.id === carRental.id}
              onChange={() => handleSelectCar(carRental)}
            />
            <label htmlFor={`car-${carRental.id}`}>
              {carRental.car_type} - {carRental.price}
            </label>
          </li>
        ))}
      </ul>

      {/* Add a submit button to navigate to Payments */}
      <button onClick={handleNavigateToPayments}>Submit and Go to Payments</button>
    </div>
  );

};
export default CarRentalsPage;