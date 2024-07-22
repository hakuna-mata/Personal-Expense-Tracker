# Personal-Expense-Tracker
This application allows users to track their daily expenses, categorize them, and view detailed reports to help them stay on top of their finances.


frontend - Holds the client application
public - This holds all of our static files
src
assets - This folder holds assets such as images, docs, and fonts
App.jsx - This is what renders all of our browser routes and different views
index.jsx - This is what renders the react app by rendering App.js, should not change
package.json - Defines npm behaviors and packages for the client

backend - Holds the server application
models - This holds all of our data models
server.js - Defines server configuration,db configuration,routes and its route handlers
package.json - Defines npm behaviors and packages for the client
.gitignore - Tells git which files to ignore

README - This file!
Client-side usage
$ cd client         // go to client folder
$ npm i    // npm install packages
$ npm run dev        // run it locally

Server-side usage(PORT: 8080)
$ cd server   // go to server folder
$ npm i       // npm install packages
$ nodemon app

Tech Stack

Frontend: React, Material-UI
Backend: Node.js, Express
Database: MongoDB
Authentication: Passport

Features

User authentication and authorization using passport
Create, read and delete operations for expenses
Expense categorization (e.g., food, transportation, entertainment)
Detailed reports and statistics to help users track their spending habits
Responsive and user-friendly interface built using React and Material-UI
