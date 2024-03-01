from flightAPI import *
from data import *
from car_rentals import *

def main():
    create_database()
    flight_data = generate_random_flight_data(1000)
    insert_flight_data_into_sqlite(flight_data)
    return_flights = generate_return_flights(flight_data)
    insert_flight_data_into_sqlite(return_flights)
    car_rentals=generate_car_rentals_for_all_flights(flight_data,num_options=8)
    insert_car_rental_data(car_rentals)


main()
