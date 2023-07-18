# Sequelize Blogging Application

This is a blogging application built using the Sequelize ORM (Object-Relational Mapping) tool and Express.js as the web framework. The application allows users to create, read, update, and delete blog posts and comments. Authentication is implemented to ensure that only authenticated users can perform CRUD operations.

## Project Structure

The project structure is organized as follows:

- `models/`: Database models and associations
  - `index.js`: Initializes and configures Sequelize.
  - `post.js`: Post model definition and associations.
  - `comment.js`: Comment model definition and associations.
  - `user.js`: User model definition and associations.
- `config/`: Configuration files
  - `config.js`: Database configuration
- `migrations`: Files created during migrations.
  - `migration_name * 4`
- `seeders` Files used to fill up database with real data.
  - `seed_field_name`
- `repl.js`: A file for debugging purpose.
- `.env` : Database credentials for the program
- `server.js`: Launches webpage and all its capabilities. 
- `README.md`: Project documentation

## Getting Started

To set up and run the application, follow these steps:

1. Clone the repository: `git clone https://github.com/ddamme05/TTP-Assignments.git`
2. Navigate to the project directory: `cd \blogging\`
3. Install dependencies: `npm install`
4. Create a database for the program.
5. Configure the database connection by creating the `.env` file.
6. Run the database migrations: `npx sequelize-cli db:migrate`
7. Run the seed data: `npx sequelize-cli db:seed:all`
8. Start the application: `npm start`
9. The application will be running on `http://localhost:4000`.

## API Endpoints

The application provides the following API endpoints:

### Posts

- `GET /posts`: Retrieve all posts, includes parameters.
- `POST /posts`: Create a new post.
- `GET /posts/:id`: Retrieve a specific post by ID.
- `PUT /posts/:id`: Update a specific post by ID.
- `DELETE /posts/:id`: Delete a specific post by ID.

### Comments

- `GET /posts/:postId/comments`: Retrieve all comments for a specific post.
- `POST /posts/:postId/comments`: Create a new comment for a specific post.
- `GET /comments/:id`: Retrieve a specific comment by ID.
- `PUT /comments/:id`: Update a specific comment by ID.
- `DELETE /comments/:id`: Delete a specific comment by ID.
- `GET /users/:userId/comments`: Retrieves all comments for a specific user.
- `GET /posts/:postId/comments`: Retrieves all comments for a specififc post.
- `POST /posts/:postId/comments`: Adds a comment to a post.
- `DELETE /posts/:postId/comments/:commentId`: Removes a comment from a post.

### Authentication

- `POST /signup`: Create a new user account.
- `POST /login`: Log in an existing user.
- `DELETE /logout`: Log out the current user.

- Test the program using the `Postman` application using link below

- For routes using advanced queries, make sure to check the `Params` section of `Postman`!

[Postman Collection](https://www.postman.com/ddamme/workspace/ddammepublic/collection/28379527-24982eb2-3f50-4182-9508-685d3e593179?action=share&creator=28379527)