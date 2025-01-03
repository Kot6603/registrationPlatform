# Registration Platform
Mini registration platform for events using the MERN stack.

## Codebase Structure

The codebase is separated into a backend folder (handles server side code) and the frontend directory (handles client side code).

### Basic Code Structure
```
backend/
-- config/          // configuration (currently only database)
-- controllers/     // API functions
-- middleware/      // middleware functions
-- models/          // database model schemas
-- routes/          // API routes
-- index.js

frontend/
-- src/
-- -- assets/       // any assets used
-- -- components/   // reusable frontend components
-- -- context/      // context used with useContext
-- -- hooks/        // custom hooks
-- -- pages/        // pages for the application
-- -- styles/       // styles
-- -- App.jsx       // handles frontend routing
-- -- main.jsx      // main entry - has context wrappers
```

## Key Decisions
One of the key decisions I had to make was how to handle authentication and authorization. I needed to ensure both my API routes and my React routes were protected, allowing access only to authorized users while preventing unauthorized users from viewing restricted content.

For this, I chose to use JSON Web Tokens (JWT) and `localStorage`.
- JWT was used to authenticate users as they could be generated upon successful login and sent to the client. These can then be used to control access to the React routes. They are also sent with each API request to protected routes to validate access to protected resources.
- `localStorage` was used to store the JWT token persistently on the client side. This allowed the user to remain logged in even if they refreshed the page, providing a smoother user experience.

I also chose to have two global state contexts wrapping my application. These were the `AuthContext` and `EventContext`.
- `AuthContext` was responsible for handling authentication and authorisation, keeping track of session state and providing methods to login and logout.
- `EventContext` was responsible for fetching and storing events, as well as managing any updates to the state of events.

Both the `auth` and `event` states were made global so that any component can access the state of the two contexts. I implemented it this way as the state of the current session and the state of the events did not need to be protected and was accessible even when not logged in.

I have also added filters for both the event lists and the user lists so that user can access the resources that they want easily.

I used express router for my backend API routes as that made it easy for me to add middleware to specific routes. This enabled me to protect backend API routes from unauthorised access more easily.

## Extra Features
- Global State Management using `useContext`
- Protected routes in both frontend and backend using JSON Web Tokens
- Persistent Sessions using tokens stored in `localStorage`
- Password hashing using `bcrypt`

## Project Wireframe
![](mockup.png)
The project wireframe was kept the same as the one provided with a few minor tweaks (most routes are the same)

Changes:
- Logging in as the admin user will redirect you to the /admin page, not the / (landing) page. Logging in as any other user will redirect you to the landing page.
    - This made sense as I have made it so that admin cannot join events (hence they are also filtered from the user list in the admin page).

## Backend API Documentation
### Event APIs
#### Public Routes
- `GET /api/events`
    - gets all events information
- `GET /api/events/:id`
    - get a specific event with `:id`

#### Protected Routes (need bearer token)
- `POST /api/events/:id/users`
    - add the user with `userId` from the payload to the event with `:id`

#### Admin Routes (need bearer token of admin)
- `POST /api/events`
    - create a new event with the information from the payload
- `DELETE /api/events/:id`
    - delete the event with `:id`

### User APIs
#### Public Routes
- `POST /api/users/login`
    - logs in the user 
    - sends a JWT token in the response
- `POST /api/users/signup`
    - creates a new user and saves the user data in the database
    - sends a JWT token in the response

#### Protected Routes (need bearer token)
- `GET /api/users/:id`
    - get the information of user with `:id`
    - the `:id` must match the current session's user id
- `PATCH /api/users/:id`
    - update the information of user with `:id`
    - the `:id` must match the current session's user id

#### Admin Routes (need bearer token of admin)
- `GET /api/users`
    - gets the information of all users