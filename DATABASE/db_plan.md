# Database Design

## Overview

The database is designed for a fictional e-commerce application.

The system allows both registered customers and guests to browse products, manage a shopping cart and place fictional orders.

# Entities

## User

- id INT
- username VARCHAR(50)
- email VARCHAR(255)
- password VARCHAR(255)
- shipping VARCHAR(255)
- role INT

## Category

- id INT
- name VARCHAR(100)

## Product

- id INT
- category_id INT
- name VARCHAR(150)
- description TEXT
- price DECIMAL(10,2)
- stock INT
- image VARCHAR(255)


## Cart

- id INT
- user_id INT


## CartItem

- id INT
- cart_id INT
- product_id INT
- quantity INT


## Order

- id INT
- user_id INT
- customer_name VARCHAR(100)
- customer_email VARCHAR(255)
- shipping_user VARCHAR(255) 
- total_price DECIMAL(10,2)
- status VARCHAR(30)


## OrderItem

- id INT
- order_id INT
- product_id INT
- quantity INT
- unit_price DECIMAL(10,2)

## CreditTransaction

- id INT
- user_id INT
- amount INT
- type VARCHAR(20)
- description VARCHAR(255)

```mermaid
erDiagram
    USER {
        INT id PK
        VARCHAR username
        VARCHAR email
        VARCHAR password
        VARCHAR shipping
        INT role
    }

    CATEGORY {
        INT id PK
        VARCHAR name
    }

    PRODUCT {
        INT id PK
        INT category_id FK
        VARCHAR name
        TEXT description
        DECIMAL price
        INT stock
        VARCHAR image
    }

    CART {
        INT id PK
        INT user_id FK
    }

    CART_ITEM {
        INT id PK
        INT cart_id FK
        INT product_id FK
        INT quantity
    }

    ORDER {
        INT id PK
        INT user_id FK
        VARCHAR customer_name
        VARCHAR customer_email
        VARCHAR shipping_user
        DECIMAL total_price
        VARCHAR status
    }

    ORDER_ITEM {
        INT id PK
        INT order_id FK
        INT product_id FK
        INT quantity
        DECIMAL unit_price
    }

    CREDIT_TRANSACTION {
        INT id PK
        INT user_id FK
        INT amount
        VARCHAR type
        VARCHAR description
    }

    USER ||--o| CART : has
    USER ||--o{ ORDER : places
    USER ||--o{ CREDIT_TRANSACTION : has

    CATEGORY ||--o{ PRODUCT : contains

    CART ||--|{ CART_ITEM : contains
    PRODUCT ||--o{ CART_ITEM : included_in

    ORDER ||--|{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : included_in