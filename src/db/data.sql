create table costumers(
    id serial PRIMARY KEY,
    fullname VARCHAR(100),
    age int,
    gender VARCHAR(10),
    phone VARCHAR(100),
    address VARCHAR(150)
);

create table cars(
    id serial PRIMARY KEY,
    model VARCHAR(100),
    colour VARCHAR(50),
    price int,
    year date
);

create table orders(
    id serial PRIMARY KEY,
    costumer_id int REFERENCES costumers(id),
    car_id int REFERENCES cars(id),
    month_count int,
    start_date date,
    end_date date,
    payment_date int,
    start_price int,
    max_price int,
    paid_price int,
    rest_price int
);

create table payments(
    id serial PRIMARY KEY,
    order_id int REFERENCES orders(id),
    price int,
    created_at date
);


