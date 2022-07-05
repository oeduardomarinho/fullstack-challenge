[![codecov](https://codecov.io/gh/eduardommmarinho/fullstack-challenge/branch/master/graph/badge.svg?token=W29521EOPO)](https://codecov.io/gh/eduardommmarinho/fullstack-challenge)

This is a NodeJs + Express + Sequelize API.

# Some choices that has been made.

- Express: framework to speed up development, bringing some builtins for routing and dealing with requests and responses.

- Sequelize: ORM (Object Relation Manager) to abstract some parts of the database, like SQL (Structure Query Language) querying and row to object mapping. 

  - Umzug: Sequelize suggested library to deal with database migrations that helped with consistency of data, because it realizes which migrations has been already migrated to database and which has not without using Sequelize CLI, that is heavier and slower.
  
  - Postgres: relational database that supports documents and is open and free. to be far, this detail is transparent during development due to Sequelize.

- Joi: type checker library to validate data received from routes. very useful to middlewares and services validations.

- Mocha: test framework to guarantee that, after a change in the code, the logic remains the same. can be used to Unit, Integration and End2End tests.
  
  - NYC: library used for test code coverage. _See badge at the top._ 

- Winston: logging everything that is hapenning in the backstage, with time, operation and operator (via IP).

# What is needed to get started

- a Postgres instance: can be manually installed or be provided via docker.
- an .env file pointing to that database instance with at least one database created and also pointed in this file. an .env.example is provided in this repo.

# Init

```
npm install
```

then

for a clear start (only schema migrations will run)
```
npm run start
```

for a seeded start (schema + seeds)
```
npm run dev
```



