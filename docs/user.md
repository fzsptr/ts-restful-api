# User API Spec

## Register User

Endpoint : POST /api/users

Request Body : 

```json
{
    "username" : "fauzi",
    "password" : "rahasia",
    "name" : "fauzi saputra"
}
```

Response Body (Success):

```json
{
    "data" : {
        "username" : "fauzi",
        "name" : "fauzi saputra"
    }
}
```

Response Body (Failed) :

```json
{
    "errors" : "username must not blank"
}
```

## Login User

Endpoint : POST /api/users/login

Request Body :

```json
{
    "username" : "fauzi",
    "password" : "rahasia"
}
```
Response Body (Success):

```json
{
    "data" : {
        "username" : "fauzi",
        "name" : "fauzi saputra",
        "token" : "uuid"
    }
}
```

Response Body (Failed) :

```json
{
    "errors" : "username or password wrong "
}
```


## Get User

Endpoint : GET /api/users/current

Request Header : 
-  X-API-TOKEN : token ()

Response Body (Success):

```json
{
    "data" : {
        "username" : "fauzi",
        "name" : "fauzi saputra"
    }
}
```

Response Body (Failed) :

```json
{
    "errors" : "Unauthorized "
}
```

## Update User

Endpoint : PATCH /api/users/current

Request Header :
- X-API-TOKEN : token

Request Body :

```json
{
    "password" : "rahasia", // tidak wajib
    "name" : "fauzi saputra" // tidak wajib
}
```

Response Body (Success):

```json
{
    "data" : {
        "username" : "fauzi",
        "name" : "fauzi saputra"
    }
}
```

Response Body (Failed) :

```json
{
    "errors" : "Unauthorized"
}
```

## Logout User

Endpoint : DELETE /api/users/current

Request Header :
- X-API-TOKEN : token


Response Body (Success):

```json
{
    "data" : "OK"
}
```

Response Body (Failed) :

```json
{
    "errors" : "Unauthorized"
}
```