# Contact API Spec

## Create Contact

Endpoint : POST /api/contacts

Request Header : 
- x-API-TOKEN : token

Request Body :
```json
{
    "first_name" : "fauzi",
    "last_name" : "saputra",
    "email" : "saputra@example.com",
    "phone" : "0892134213432"
}
```

Response Body (Success) :
```json
{
    "data" : {
        "id" : 1,
        "first_name" : "fauzi",
        "last_name" : "saputra",
        "email" : "saputra@example.com",
        "phone" : "0892134213432"
    }
}
```

Request Body (Failed) :
```json
    "errors" : "Unauthorized"
```

## Get Contact

Endpoint : GET /api/contacts/:id

Request Header : 
- X-API-TOKEN : token

Response Body (Success) :
```json
{
    "data" : {
        "id" : 1,
        "first_name" : "fauzi",
        "last_name" : "saputra",
        "email" : "saputra@example.com",
        "phone" : "0892134213432"
    }
}
```

Request Body (Failed) :
```json
    "errors" : "Contact is not found"
```

## Update Contact

Endpoint : PUT /api/contacts/:id

Request Header : 
- X-API-TOKEN : token

Request Body :
```json
{
    "first_name" : "fauzi",
    "last_name" : "saputra",
    "email" : "saputra@example.com",
    "phone" : "0892134213432"
}
```

Response Body (Success) :
```json
{
    "data" : {
        "id" : 1,
        "first_name" : "fauzi",
        "last_name" : "saputra",
        "email" : "saputra@example.com",
        "phone" : "0892134213432"
    }
}
```

Request Body (Failed) :
```json
    "errors" : "Contact is not found"
```

## Search Contact

Endpoint : GET /api/contacts

Query parameter : 
- name : string, contact first name or last name, optional 
- phone : string, contact phone, optional
- email : string, contact email, optional,
- page : number, default 1
- size : number, default 10

Response Body (Success) :
```json
{
    "data" : [
    {
        "id" : 1,
        "first_name" : "fauzi",
        "last_name" : "saputra",
        "email" : "saputra@example.com",
        "phone" : "0892134213432"
    },
    {
        "id" : 2,
        "first_name" : "fauzi",
        "last_name" : "saputra",
        "email" : "saputra@example.com",
        "phone" : "0892134213432"
    }
    ],
    "paging" : {
        "current_page" : 1,
        "total_page" : 10,
        "size" : 10 
    }
}
```

Response Body (Failed) :
```json
{
    "errors" : "Unauthorized"
}
```
## Delete Contact

Endpoint : DELETE /api/contacts/:id

Request Header :
- X-API-TOKEN : token

Response Body (Success) :
```json
{
    "data" : "OK"
}
```

Request Body (Failed) :
```json
    "errors" : "Contact is not found"
```