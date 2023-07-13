1. Fork the project.

2. Run npm install in the correct directory

3. Setup a PSQL database 

4. Setup a .env file with database

DB_USER=USER
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASSWORD=your_pass
DB_PORT=5432

5. Run npx sequelize-cli db:migrate to run migrations

6. Run npm start

7. Test using apps like Postman and pgAdmin 4
