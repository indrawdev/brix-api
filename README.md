## STANDART API

{root.api}/{version}/{grouping}/{endpoint}

### STANDART STATUS RESPONSE
```sh
200 - OK                    --> Call API Success.
201 - CREATED               --> Post Success.
400 - BAD REQUEST           --> Error on client side.
401 - UNAUTHORIZED          --> User not authorized to the request.
403 - FORBIDDEN             --> User not allowed to access.
404 - NOT FOUND             --> Request Endpoint not found.
500 - INTERNAL SERVER ERROR --> Error on server side.
502 - BAD GATEWAY           --> Invalid Response from another request.
```

### GROUP : Authentication
[1] - Register
localhost/v1/auth/register

```sh
req:
{
    "email": "test@gmail.com",
    "password": "test123"
}

res: 
{
    "message": "Register Success"
    "data": {
        "user_id": 1
        "email": "test@gmail.com"
    }
}
```

[2] - Login
localhost/v1/auth/login

```sh
req: 
{
    "email": "test@gmail.com",
    "password": "test123"
}

res:
{
    "message": "Login Success",
}
```

### GROUP : Users
[1] - List User
localhost/v1/users

```sh
res:
{
    "message": "Get data Success",
    "data": {
        "users": [
            {
                "user_id": 1,
                "email": "xxx@gmail.com"
            }, {
                "user_id": 2,
                "email": "xxx@gmail.com"
            }   
        ]
    }
}
```

'/users' // all
'/user/:id' // by id

