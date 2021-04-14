drop database if exists employee_db;

create database employee_db;

create table department (
	id int primary key,
    name varchar(30)
);

create table role (
	id int primary key,
    title varchar(30),
    salary decimal,
    department_id integer
);

create table employee (
	id int primary key,
    first_name varchar(30),
    last_name varchar(30),
    role_id integer,
    manager_id integer
);
    