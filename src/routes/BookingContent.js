import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [selectedFlights, setSelectedFlights] = useState([]);

  const addFlight = (flight) => {
    setSelectedFlights((prevFlights) => [...prevFlights, flight]);
  };

  const removeFlight = (flight) => {
    setSelectedFlights((prevFlights) =>
      prevFlights.filter((selectedFlight) => selectedFlight !== flight)
    );
  };

  const clearFlights = () => {
    setSelectedFlights([]);
  };

  return (
    <BookingContext.Provider
      value={{ selectedFlights, addFlight, removeFlight, clearFlights }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
