# Travel Tracker
![alt text](https://github.com/andrewkamal/Travel-Tracker/blob/main/public/image.png)

## Description 

Travel Tracker is a simple web application that visualizes the map and allows users to keep track of the countries they have visited. 

**index.js**: This is the main entry point of the application. It sets up the Express server and the PostgreSQL database connection, and defines the routes for the application.

**package.json**: This file contains the list of project dependencies and scripts.

**public/styles/main.css**: This file contains the CSS styles for the application.

**views/index.ejs**: This is the EJS template for the main page of the application.

## Features

- Connected to a Postgres database
- Add countries visited with ease
- Delete countries visited with ease
- Reset the whole map if needed
- Error handling is taken care of
- Keeps track of the number of countries visited

## Setup
- Clone the repository.
- Run npm install to install the project dependencies.
- Set up a PostgreSQL database and update the database connection details in index.js.
- In the database, import the data for ```countries``` and ```visited_countries``` tables from the CSV files in the repository
- Run ```nodemon index.js``` start to start the application.
 
## Usage
Visit http://localhost:3000 in your web browser to view the application. Enter the name of a country to add it to your list of visited countries.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
