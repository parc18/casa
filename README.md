steps :
1. npm install
2. npm start


-->Please find DB credentials in server.js file (Its a free service might time out after some time try making a DB locally , DBMS Failure is covered as part of this assignment)
there are four tables
1.casaone_orders
2.casaone_orders_details
3.casaone_products
4.casaone_users (did not encrypt the password for simplicity)

Relations (PK, FK) can be seen using show create table command.



APIs

LOGIN API

1. POST / localhost:3000/api/users-login/
 body
 {
	"email": "manishpremi20@gmail.com",
	"password" : "Welcome@2018"
	
}
response: 
	{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmlzaHByZW1pMjBAZ21haWwuY29tIiwiaXNBZG1pbiI6MSwidXNlcmlkIjoyLCJpYXQiOjE1MzkwMTkzMjV9.uTNmNxWT1EEwOr62JoDHqjQ9zzW9lysPjBVB5Q0ubwk"
}


2. get all order details if you are admin

GET /localhost:3000/api/all_orders

headers Authorization : JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmlzaHByZW1pMjBAZ21haWwuY29tIiwiaXNBZG1pbiI6MSwidXNlcmlkIjoyLCJpYXQiOjE1MzkwMjIyNTN9.6gsfmp0np8s-6xBE4XvBbyRP7YFoyEikrr9-TOcVADI

response
{
    "Error": false,
    "Message": "Success",
    "orders": [
        {
            "order_id": 1,
            "user_id": 2,
            "order_date": "2018-10-08T11:35:45.000Z",
            "total_price": 10
        },
        {
            "order_id": 11,
            "user_id": 12,
            "order_date": "2018-10-08T11:36:00.000Z",
            "total_price": 10
        }
    ]
}

3. get all order of a user 

GET / localhost:3000/api/user_order
headers Authorization : JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmlzaHByZW1pMjBAZ21haWwuY29tIiwiaXNBZG1pbiI6MSwidXNlcmlkIjoyLCJpYXQiOjE1MzkwMjIyNTN9.6gsfmp0np8s-6xBE4XvBbyRP7YFoyEikrr9-TOcVADI

Response
{
    "Error": false,
    "Message": "Success",
    "orders": [
        {
            "order_id": 1,
            "user_id": 2,
            "order_date": "2018-10-08T11:35:45.000Z",
            "total_price": 10,
            "product_id": 1,
            "quantity": 1
        }
    ]
}

4. specific order id 

localhost:3000/api/order_details/11

headers Authorization : JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hbmlzaHByZW1pMjBAZ21haWwuY29tIiwiaXNBZG1pbiI6MSwidXNlcmlkIjoyLCJpYXQiOjE1MzkwMjIyNTN9.6gsfmp0np8s-6xBE4XvBbyRP7YFoyEikrr9-TOcVADI

Response

{
    "Error": false,
    "Message": "Success",
    "orders": [
        {
            "order_id": 11,
            "user_id": 12,
            "order_date": "2018-10-08T11:36:00.000Z",
            "total_price": 10,
            "product_id": 2,
            "quantity": 1
        }
    ]
}
