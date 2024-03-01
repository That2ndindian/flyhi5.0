import random
import sqlite3
from data import rental_car_companies, car_type
from faker import Faker

from datetime import timedelta

fake = Faker()


def generate_rental_price(flight_price, percentage_factor=0.2, min_rental_price=50, max_rental_price=300):
    # Calculate rental price as a percentage of the flight price
    rental_price = flight_price * percentage_factor

    # Ensure the rental price is within the specified range
    rental_price = max(min_rental_price, min(max_rental_price, rental_price))

    return int(rental_price)


def generate_car_rentals_for_all_flights(flight_data, num_options=4):
    all_car_rentals = []

    for flight in flight_data:
        for _ in range(num_options):
            # Extract departure date from the flight
            departure_date = flight[6]

            # Set pickup date to match the departure date
            pickup_date = departure_date

            # Generate random return date after the pickup date and before the arrival date
            return_date = fake.date_time_between_dates(datetime_start=pickup_date, datetime_end=flight[7])

            rental_info = {
                'rental_company': random.choice(rental_car_companies),
                'car_type': random.choice(car_type),
                'pickup_city': flight[4],  # Pickup City (matching flight arrival city)
                'pickup_date': pickup_date,
                'return_date': return_date,
                'rental_price': generate_rental_price(flight[9]),
            }

            all_car_rentals.append(rental_info)

    return all_car_rentals


def insert_car_rental_data(rental_data):
    conn = sqlite3.connect('/src/routes/flight_data.db')
    cursor = conn.cursor()

    for rental_info in rental_data:
        cursor.execute('''
            INSERT INTO car_rentals (
                rental_company, car_type, pickup_city, pickup_date,
                return_date, rental_price
            ) VALUES (?, ?, ?, ?, ?, ?)
        ''', (
            rental_info['rental_company'],
            rental_info['car_type'],
            rental_info['pickup_city'],
            rental_info['pickup_date'],
            rental_info['return_date'],
            rental_info['rental_price']
        ))

    conn.commit()
    conn.close()

