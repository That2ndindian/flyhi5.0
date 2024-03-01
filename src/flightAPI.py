import sqlite3
from faker import Faker
from datetime import datetime, timedelta
import random
from data import cities, flight_companies

fake = Faker()


def create_database():
    conn = sqlite3.connect('routes/flight_data.db')
    cursor = conn.cursor()

    cursor.execute('\n'
                   '        CREATE TABLE IF NOT EXISTS flights (\n'
                   '            id INTEGER PRIMARY KEY AUTOINCREMENT,\n'
                   '            airline_name TEXT,\n'
                   '            flight_iata TEXT,\n'
                   '            departure_airport TEXT,\n'
                   '            departure_iata TEXT,\n'
                   '            arrival_airport TEXT,\n'
                   '            arrival_iata TEXT,\n'
                   '            departure_date TEXT,\n'
                   '            arrival_date TEXT,\n'
                   '            reward_points INTEGER,\n'
                   '            flight_price INTEGER,\n'
                   '             INTEGER\n'
                   '        )\n'
                   '    ')
    cursor.execute('''
            CREATE TABLE IF NOT EXISTS car_rentals (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                rental_company TEXT,
                car_type TEXT,
                pickup_city TEXT,
                pickup_date TEXT,
                return_date TEXT,
                rental_price INTEGER
            )
        ''')
    conn.commit()
    conn.close()


def generate_acronym(city):
    return city[:3].upper()


def get_initials(company_name):
    words = company_name.split()
    if len(words) >= 2:
        return words[0][0].upper() + words[1][0].upper()
    elif len(words) == 1:
        return words[0][0].upper()
    else:
        return ""


def generate_random_flight_data(num_flights=400):
    global arrival_date
    all_cities = cities
    flight_data = []

    for departure_city in all_cities:
        for arrival_city in all_cities:
            if departure_city != arrival_city:
                for _ in range(10):
                    airline_name = random.choice(flight_companies)
                    flight_iata = get_initials(airline_name) + str(random.randint(1000, 9999))
                    departure_city = random.choice(all_cities)
                    arrival_city = random.choice(all_cities)
                    departure_iata = generate_acronym(departure_city)
                    arrival_iata = generate_acronym(arrival_city)
                    start_date = datetime.now()
                    end_date = datetime(2026, 12, 31)
                    departure_date = fake.date_time_between_dates(datetime_start=start_date, datetime_end=end_date, tzinfo=None)

                    max_arrival_date = departure_date + timedelta(hours=8)
                    arrival_date = fake.date_time_between_dates(datetime_start=departure_date, datetime_end=max_arrival_date, tzinfo=None)

                    flight_info = (
                        airline_name,  # Airline Name 0
                        flight_iata,  # Flight IATA 1
                        departure_city,  # Departure Airport 2
                        departure_iata,  # Departure IATA (Acronym) 3
                        arrival_city,  # Arrival Airport 4
                        arrival_iata,  # Arrival IATA (Acronym) 5
                        departure_date, # 6
                        arrival_date,  # Flight Date #7
                        random.randint(1, 5000),  # Reward Points
                        random.randint(101, 1000)  # Flight Price
                    )
                    flight_data.append(flight_info)

    return flight_data
def generate_return_flights(original_flights):
    return_flights = []

    for flight in original_flights:
        # Extract relevant information from the original flight

        airline_name, flight_iata, departure_city, departure_iata, arrival_city, arrival_iata, departure_date, arrival_date, reward_points, flight_price = flight
        return_departure_date = departure_date + timedelta(hours=6)
        return_arrival_date = arrival_date + timedelta(hours=7)
        # Swap departure and arrival details for the return flight
        return_flight_info = (
            airline_name,  # Airline Name
            flight_iata + 'R',  # Modify Flight IATA for return flights (e.g., append 'R')
            arrival_city,  # Departure Airport becomes Arrival Airport for return
            arrival_iata,  # Departure IATA becomes Arrival IATA for return
            departure_city,  # Arrival Airport becomes Departure Airport for return
            departure_iata,  # Arrival IATA becomes Departure IATA for return
            return_arrival_date,  # Departure Date becomes Arrival Date for return
            return_departure_date,  # Arrival Date becomes Departure Date for return
            reward_points,  # Reward Points remain the same
            flight_price  # Flight Price remains the same
        )

        return_flights.append(return_flight_info)

    return return_flights


def insert_flight_data_into_sqlite(flight_data):
    conn = sqlite3.connect('/src/routes/flight_data.db')
    cursor = conn.cursor()

    for flight_info in flight_data:
        cursor.execute('''
            INSERT INTO flights (
                airline_name, flight_iata, departure_airport, departure_iata,
                arrival_airport, arrival_iata, departure_date, arrival_date,
                reward_points, flight_price
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)
        ''', flight_info)

    conn.commit()
    conn.close()


create_database()
# insert_flight_data_into_sqlite(random_flight_data)
