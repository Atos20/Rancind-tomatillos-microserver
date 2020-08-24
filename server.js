const express = require('express');
const app = express();
const cors = require('cors');

// Designate the port this server will run through
app.set('port', process.env.port || 3001);

// Declare app-level middleware
app.use(express.json());
app.use(cors());

// Define the information stored in app.locals - 
// you can add as many key/value pairs to the app.locals object as you wish!
app.locals.title = 'Rancid Tomatillos Microservice Server';
app.locals.encouragement = ["You can do it!", "I believe in you!", "You got this!"];

// Example GET endpoint
app.get('/api/v1/cheerleading', (request, response) => {
  response.status(200).json(app.locals.encouragement);
})

// Declare COMMENTING endpoints here 👇


// Declare FAVORITING endpoints here 👇


// Declare WATCHED endpoints here 👇 (only for teams of 3)


// Listen for queries to this server
app.listen(app.get('port'), () => console.log(`${app.locals.title} is now listening on port ${app.get('port')}!`));