# API Endpoints for Users

## Public Routes

### POST `/api/users/signup`

Creates a new user and saves the user data in the database. Sends a JWT token in the response.

```json
// request body
{
    "email": "email",
    "password": "password",
    "name": "name"
}

---
// response body
{
    "id": "userId from database",
    "email": "user email",
    "token": "jwt token for the session"
}
```

### POST `/api/users/login`

Logs in the user and sends a JWT token in the response.

```json
// request body
{
    "email": "email"
    "password": "password"
}

---
// response body
{
    "id": "userId from database",
    "email": "user email",
    "token": "jwt token for the session"
}
```

## Protected Routes
( need bearer token )

### GET `/api/users/:id`

Get the information of user with `:id`. The `:id` must match the current session's user id.

```json
// no request body

---
// response body
{
    "id": "userId from database",
    "email": "user email",
    "name": "user name"
}
```

### PATCH `/api/users/:id`

Update the information of user with `:id`. The `:id` must match the current session's user id.

```json
// request body
{
    "name": "name"
}

---
// response body
{
    "email": "user email",
    "name": "user name"
}
```

## Admin Routes
( need bearer token of admin )

### GET `/api/users`

Gets the information of all users.

```json
// no request body

---
// response body
[
    {
        "id": "userId from database",
        "email": "user email",
        "password": "user password",
        "name": "user name"
    },
    ...
]
```

