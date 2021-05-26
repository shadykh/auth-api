# Lab: Class 08

### Authentication Server Phase 3: Role Based Access Control

Being able to login is great. But controlling access at a more granular level is vital to creating a scalable system. In this lab, you will implement Role Based Access Control (RBAC) using an Access Control List (ACL), allowing to not only restrict access to routes for valid users, but also based on the individual permissions we give each user.
Over the course of the previous 2 modules, you have separately created an `auth-server` and an `api-server` ... In this lab, you will be integrating those 2 servers to create a single, authenticated API server.

## Phase 3 Requirements

In this final phase, the new requirement is to extend the restrictive capabilities of our routes to our API, implementing a fully functional, authenticated and authorized API Server using the latest coding techniques

Specifically, we want to make the following restrictions:

- Regular users can **READ**
- Writers can **READ** and **CREATE**
- Editors can **READ**, **CREATE**, and **UPDATE**
- Administrators can **READ**, **CREATE**, **UPDATE**, and **DELETE**

Routes that end up performing those actions in our API/Database need to be protected by both a valid user and that user's permissions

## Technical Requirements / Notes

Begin with the 2 servers provided to you in the `starter-code` folder.

- `api-server` is a fully functional API server that performs CRUD operations via REST
- `auth-server` is a fully functional Auth server, capable of adding users, logging users in, and providing middleware that can be used to protect any route

### Task 1: Combine these 2 servers into a single server

- Your server should respond to the following routes:
  - POST `/signup` to create a user
  - POST `/signin` to login a user and receive a token
  - GET `/secret` should require a valid bearer token
  - GET `/users` should require a valid token and "delete" permissions

**NOTE:** You will have some duplicated files and functionality between the 2 servers. Eliminate the waste and end with a single running server with all current routes functional

### Task 2: Create a new set of "Protected" API routes

Restrict access without a valid token AND a specific capability.

- Create a new set of routes (V2) within the server
  - V2 API Routes (`/api/v2/...`) must now be protected with the proper permissions based on user capability, using Bearer Authentication and an ACL
    - `app.get(...)` should require authentication only, no specific roles
    - `app.post(...)` should require both a bearer token and the `create` capability
    - `app.put(...)` should require both a bearer token and the `update` capability
    - `app.patch(...)` should require both a bearer token and the `update` capability
    - `app.delete(...)` should require both a bearer token and the `delete` capability

### Task 3: Apply best practices and quality engineering

- Full Test Coverage
- Well executed UML and WRRC Diagrams
- Polished and Complete Developer Friendly README.md at the root of your repo

### Clean and Test

The provided server works to support the above requirements, but it has a few principle shortcomings that you must address

1. Convert any method that's using promise syntax (`.then()`) to use the more modern `async`/`await` syntax
1. Ensure that all route handler methods, middleware methods, model methods are properly catching and responding to errors.
   - Do you have `try/catch` in place wherever you can?
   - Are you logging full errors to the console?
   - Are you giving properly formatted errors to the browser in the response?
1. Write a suite of tests that make the following assertions, at minimum:
   - AUTH Routes
     - POST /signup creates a new user and sends an object with the user and the token to the client
     - POST /signin with basic authentication headers logs in a user and sends an object with the user and the token to the client
   - V1 (Unauthenticated API) routes
     - POST /api/v1/:model adds an item to the DB and returns an object with the added item
     - GET /api/v1/:model returns a list of :model items
     - GET /api/v1/:model/ID returns a single item by ID
     - PUT /api/v1/:model/ID returns a single, updated item by ID
     - DELETE /api/v1/:model/ID returns an empty object. Subsequent GET for the same ID should result in nothing found
   - V2 (Authenticated API Routes)
     - POST /api/v2/:model with a bearer token that has `create` permissions adds an item to the DB and returns an object with the added item
     - GET /api/v2/:model with a bearer token that has `read` permissions returns a list of :model items
     - GET /api/v2/:model/ID with a bearer token that has `read` permissions returns a single item by ID
     - PUT /api/v2/:model/ID with a bearer token that has `update` permissions returns a single, updated item by ID
     - DELETE /api/v2/:model/ID with a bearer token that has `delete` permissions returns an empty object. Subsequent GET for the same ID should result in nothing found

### Visual Validation

We have deployed a web application that's designed to test your Server. This is a good way to ensure that your system works as expected. There's nothing to "turn in" here, this is provided for your benefit.

- Open this [Web Application](https://javascript-401.netlify.app/)
  - Click the "Module 3 (AUTH) / ACL" Link
  - In the form at the top of the page, enter the URL to your Authentication Server and all other relevant information
  - First login with a username and password
  - Then, you should see buttons that would invoke each of the routes described above.
  - Based on your role, each button will give you a good or a bad response.

#### **Routes**

- `/signup`
  - Used to create a new user with a password

- `/signin`
  - Used to sign in with a user and password

- `/users`
  - Used to show all users

- `/secret`
  - Used to open a secret page

- `/api/v1/food`

- `/api/v1/clothes`

- `/api/v2/food`

- `/api/v2/clothes`

#### **The lab tree**

- ![Tree](./assets/tree.gif)

#### **Testing**

- AUTH Routes
  - POST /signup creates a new user and sends an object with the user and the token to the client
  - POST /signin with basic authentication headers logs in a user and sends an object with the user and the token to the client
  - V1 (Unauthenticated API) routes
    - POST /api/v1/:model adds an item to the DB and returns an object with the added item
    - GET /api/v1/:model returns a list of :model items
    - GET /api/v1/:model/ID returns a single item by ID
    - PUT /api/v1/:model/ID returns a single, updated item by ID
    - DELETE /api/v1/:model/ID returns an empty object. Subsequent GET for the same ID should result in nothing found
  - V2 (Authenticated API Routes)
    - POST /api/v2/:model with a bearer token that has `create` permissions adds an item to the DB and returns an object with the added item
    - GET /api/v2/:model with a bearer token that has `read` permissions returns a list of :model items
    - GET /api/v2/:model/ID with a bearer token that has `read` permissions returns a single item by ID
    - PUT /api/v2/:model/ID with a bearer token that has `update` permissions returns a single, updated item by ID
    - DELETE /api/v2/:model/ID with a bearer token that has `delete` permissions returns an empty object. Subsequent GET for the same ID should result in nothing found

### **More about the Lab**

- #### Github

  - For the repo ***auth-api*** clicks => [here](https://github.com/shadykh/auth-api).
  - Pull Requests:
    - [https://github.com/shadykh/auth-api/pull/2](https://github.com/shadykh/auth-api/pull/2)
    - GitHub actions:
        - [https://github.com/shadykh/auth-api/runs/2680053839?check_suite_focus=true](https://github.com/shadykh/auth-api/runs/2680053839?check_suite_focus=true)
        - [https://github.com/shadykh/auth-api/runs/2680055833?check_suite_focus=true](https://github.com/shadykh/auth-api/runs/2680055833?check_suite_focus=true)
        - [https://github.com/shadykh/auth-api/runs/2680056537?check_suite_focus=true](https://github.com/shadykh/auth-api/runs/2680056537?check_suite_focus=true)
  - Local Tests:
    - ![Local Test test-v1](https://raw.githubusercontent.com/shadykh/auth-api/main/assets/test-v1.PNG)
    - ![Local Test test-v2](https://raw.githubusercontent.com/shadykh/auth-api/main/assets/test-v2.PNG)
    - ![Local Test test-router](https://raw.githubusercontent.com/shadykh/auth-api/main/assets/test-router.PNG)
    - ![Local Test test-bearer-auth-middleware](https://raw.githubusercontent.com/shadykh/auth-api/main/assets/test-bearer-auth-middleware.PNG)
    - ![Local Test test-basic-auth-middleware](https://raw.githubusercontent.com/shadykh/auth-api/main/assets/test-basic-auth-middleware.PNG)
    - ![Local Test test-coverage](https://raw.githubusercontent.com/shadykh/auth-api/main/assets/test-coverage.PNG)
  - GitHub Tests:
    - ![github tests](https://raw.githubusercontent.com/shadykh/auth-api/main/assets/githubtests.PNG)


- #### Heroku

  - For the link of the ***deployment main branch => `/` <= route***  clicks => [here](https://shady-auth-api.herokuapp.com/).
  - For the link of the ***deployment branch => `/api/v1/food` <= route***  clicks => [here](https://shady-auth-api.herokuapp.com/api/v1/food).
- #### Endpoints

  - `/signup` Return JSON objects

    -

     ```
     {
        "user": {
            "_id": "60ad21b46ee66807acaacf6e",
            "username": "shady66",
            "password": "$2b$10$9Aa9KXApHALFsDz/HfBSYedqF.udhW8CMwZH64iPjghJKCJR8kxUK",
            "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYWR5NjYiLCJpYXQiOjE2MjE5NTkxNzMsImV4cCI6MTYyMjg1OTE3MywiaXNzIjoic2hhZHkiLCJqdGkiOiJqd3RpZCJ9.o7oRaqVoD14aHaZlBD15o61-NRRi-btYvdclRwzSsZg"
    }
    ```

  - `/signin` Return JSON objects

    -

     ```
     {
        "user": {
            "_id": "60ad21b46ee66807acaacf6e",
            "username": "shady66",
            "password": "$2b$10$9Aa9KXApHALFsDz/HfBSYedqF.udhW8CMwZH64iPjghJKCJR8kxUK",
            "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoYWR5NjYiLCJpYXQiOjE2MjE5NTkxNzMsImV4cCI6MTYyMjg1OTE3MywiaXNzIjoic2hhZHkiLCJqdGkiOiJqd3RpZCJ9.o7oRaqVoD14aHaZlBD15o61-NRRi-btYvdclRwzSsZg"
    }
    ```

  - `/secret` Return a custom sentence
    - `Welcome to the secret area!`

  - `/users` Return a list of users
    -
    - ```
      [
        "shady9v",
        "shady66"
      ]
      ```

- #### UML

  - ![UML](https://raw.githubusercontent.com/shadykh/auth-api/main/assets/UML.PNG)

- #### Tests

  - run `npm test`
  - Auth Middleware ➡️ [bearer-auth-middleware.test.js](./__tests__/bearer-auth-middleware.test.js)
  - Auth Router ➡️ [router.test.js](./__tests__/router.test.js)
  - Auth Middleware ➡️ [basic-auth-middleware.test.js](./__tests__/basic-auth-middleware.test.js)
  - api v1  ➡️ [v1.test.js](./__tests__/v1.test.js)
  - api v2  ➡️ [v2.test.js](./__tests__/V2.test.js)

- #### App

  - run `npm start` or `nodmon`
  - visit Herokue depolyed app [here](https://shady-auth-api.herokuapp.com/)

- I did this lab with help of
  - dependencies
    - morgen
    - mongoose
    - cors
    - express
    - dotenv
    - bcrypt
    - base-64
    - jsonwebtoken
  - devDependencies
    - supertest
    - jest
    - eslint
    - supergoose
  - framework
    - Node.js
  - tools
    - Github.
    - Heroku.
    - VsCode.
    - Ubuntu.
    - atlas mongodb
    - Postman


<br>

---
<br>

- ### Shady Khaled github ✅

  - [Shady Khaled](https://github.com/shadykh)

- ### Shady Khaled reading notes 📚

  - [Shady Khaled reading notes](https://shadykh.github.io/reading-notes/)

- ### Shady Khaled portfolio 💬

  - [Shady Khaled portfolio](https://portfolio-shady.herokuapp.com/)
