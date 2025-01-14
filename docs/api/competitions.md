# API Endpoints for Competitions

## Public Routes

### GET `/api/competitions`

Gets all the competitions

```json
// no request body

// response body
[
    {
        "id": "competitionId",
        "title": "title of competition",
        "questionsId": ["list of question Id"],
        "startTime": "date object of start time",
        "endTime": "date object of end time",

    },
    ...
]
```

## Protected Routes
( need bearer token )

### GET `/api/competitions/{id}/questions/test`

Gets the questions for the competition with `{id}`

```json
// no request body

// response body
[
    {
        "id": "questionId",
        "title": "question"
        "options": [
            "option1",
            "option2",
            "option3",
            "option4"
        ]
    },
    ...
]
```

### POST `/api/competitions/{id}/attempts`

Saves the attempt to the database

```json
// request body
{
    "attempt": {
        "questionId": 2 (attempted index),
        "questionId": 3,
        ...
    }
}

// response body
{
    "id": "attemptId",
    "studentEmail": "student email",
    "competitionId": "competitionId",
    "attempt": {
        "questionId": 2 (attempted index),
        "questionId": 3,
        ...
    }
}
```

## Admin Routes
( need bearer token of admin )

### GET `/api/competitions/questions 

Gets all questions (and all information about them including the correct answer)

```json
// no request body

// response body
[
    {
        "id": "questionId",
        "title": "question",
        "options": [
            "option1",
            "option2",
            "option3",
            "option4"
        ],
        "correctOptionIndex": 2 (index of correct option),
        "difficulty": "Easy/Medium/Hard",
        "topic": "Mechanics/Waves/Algebra/Geometry"
    }
    ...
]
```

### GET `/api/competitions/{id}/questions` 

Gets all questions (and all information about them including the correct answer) associated with the competition with `{id}`

```json
// no request body

// response body
[
    {
        "id": "questionId",
        "title": "question",
        "options": [
            "option1",
            "option2",
            "option3",
            "option4"
        ],
        "correctOptionIndex": 2 (index of correct option),
        "difficulty": "Easy/Medium/Hard",
        "topic": "Mechanics/Waves/Algebra/Geometry"
    }
    ...
]
```

### POST `/api/competitions`

Creates a new competition

```json
// request body
{
    "title": "title of competition",
    "startTime": "date object of start time",
    "endTime": "date object of end time",
}

// response body
{
    "id": "competitionId",
    "title": "title of competition",
    "questionsId": ["list of question Id"],
    "startTime": "date object of start time",
    "endTime": "date object of end time",
}
```

### POST `/api/competitions/questions`

Creates a new question

```json
// request body
{
    "title": "question",
    "options": [
        "option1",
        "option2",
        "option3",
        "option4"
    ],
    "correctOptionIndex": 2 (index of correct option),
    "difficulty": "Easy/Medium/Hard",
    "topic": "Mechanics/Waves/Algebra/Geometry"
}

// response body
{
    "id": "questionId",
    "title": "question",
    "options": [
        "option1",
        "option2",
        "option3",
        "option4"
    ],
    "correctOptionIndex": 2 (index of correct option),
    "difficulty": "Easy/Medium/Hard",
    "topic": "Mechanics/Waves/Algebra/Geometry"
}
```

### POST `/api/competitions/{id}/questions`

Adds a question to the competition with `{id}`

```json
// request body
{
    "questionId": "questionId"
}

// response body
{
    "id": "questionId",
    "title": "question",
    "options": [
        "option1",
        "option2",
        "option3",
        "option4"
    ],
    "correctOptionIndex": 2 (index of correct option),
    "difficulty": "Easy/Medium/Hard",
    "topic": "Mechanics/Waves/Algebra/Geometry"
}
```

### DELETE `/api/competitions/{id}/questions/{questionId}`

Delete a question from the competition with `{id}`

```json
// no request body

// no response body
{
    "id": "questionId",
    "title": "question",
    "options": [
        "option1",
        "option2",
        "option3",
        "option4"
    ],
    "correctOptionIndex": 2 (index of correct option),
    "difficulty": "Easy/Medium/Hard",
    "topic": "Mechanics/Waves/Algebra/Geometry"
}
```

### GET `/api/competitions/{id}/mark`

Marks the competition with `{id}`

```json
// no request body

// response body
{
    "title": "title of competition",
    "totalMarks": 9 (total marks),
    "marks": [
        {
            "studentEmail": "student email",
            "mark": 5 (marks obtained)
        },
        ...
    ]
}
```

