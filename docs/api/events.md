# API Endpoints for Events

## Public Routes

### GET `/api/events`

Get information for all events

```json
// no request body

// response body
[
    {
        "id": "eventId",
        "date": "eventDate",
        "name": "name of the event",
        "description": "description of the event",
        "users": [
            "userId1",
            ...
        ],
        "competitionId": "competitionId",
    },
    ...
]
```

### GET `/api/events/{id}`

Get information for a specific event

```json
// no request body

// response body
{
    "id": "eventId",
    "date": "eventDate",
    "name": "name of the event",
    "description": "description of the event",
    "users": [
        "userId1",
        ...
    ],
    "competitionId": "competitionId",
}
```

## Protected Routes
( need bearer token )

### POST `/api/events/{id}/users`

Add a user to an event with event user id `{id}`

```json
// request body
{
    "userId": "userId"
}

// response body
{
    "id": "eventId",
    "date": "eventDate",
    "name": "name of the event",
    "description": "description of the event",
    "users": [
        "userId1",
        ...
    ],
    "competitionId": "competitionId",
}
```

## Admin Routes
( need bearer token of admin )

### POST `/api/events`

Create a new event

```json
// request body
{
    "name": "name of the event",
    "date": "eventDate",
    "description": "description of the event",
}

// response body
{
    "id": "eventId",
    "date": "eventDate",
    "name": "name of the event",
    "description": "description of the event",
    "users": [
        "userId1",
        ...
    ],
    "competitionId": "competitionId",
}
```

### DELETE `/api/events/{id}`

Delete an event with event id `{id}`

```json
// no request body

// response body
{
    "id": "eventId",
    "date": "eventDate",
    "name": "name of the event",
    "description": "description of the event",
    "users": [
        "userId1",
        ...
    ],
    "competitionId": "competitionId",
}
```

### PATCH `/api/events/{id}/competitions`

Add a competition to an event with event id `{id}`

```json
// request body
{
    "competitionId": "competitionId"
}

// response body
{
    "id": "eventId",
    "date": "eventDate",
    "name": "name of the event",
    "description": "description of the event",
    "users": [
        "userId1",
        ...
    ],
    "competitionId": "competitionId",
}
```
