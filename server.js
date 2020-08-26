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
app.locals.comments = []
app.local.favoriteMovieIds = []

// Example GET endpoint
app.get('/api/v1/cheerleading', (request, response) => {
  response.status(200).json(app.locals.encouragement);
})

// Declare COMMENTING endpoints here 👇
app.post('/api/v1/comments', (request, response) => {
  const requiredProperties = [ "comment", "author", "movieId" ];
  const receivedProperties = Object.keys(req.body);

  for (let property of requiredProperties) {
    if (!receivedProperties.includes(property)) {
      return res.status(422).json({error: `Cannot POST: missing property ${property} in request.`});
    }
  }
  const newComment = {
    ...req.body,
    id: Date.now()
  }

  app.locals.comments.push(newComment);
  return res.status(201).json({ newComment: newComment });
})

app.get('/api/v1/comments/movie/:movieId', (request, response) => {
  const { movieId } = req.params;

  const commentsByMovie = app.locals.comments.filter(comment => comment.movieId === movieId)
  res.status(200).json({ comments: commentsByMovie });
})

// Declare FAVORITING endpoints here 👇
app.post('/api/v1/favorites', (request, response) => {
  const requiredProperties = [ "id" ];
  const receivedProperties = Object.keys(req.body);

  for (let property of requiredProperties) {
    if (!receivedProperties.includes(property)) {
      return res.status(422).json({error: `Cannot POST: missing property ${property} in request.`});
    }
  }

  let message;
  const foundMovieIndex = app.locals.favoriteMovies.findIndex(movieId => movieId === receivedProperties.id);
  if (!foundMovieIndex) {
    app.local.favoriteMovieIds.push(receivedProperties.id);
    message = `Movie with an id of ${receivedProperties.id} was favorited`
  } else {
    app.local.favoriteMovieIds.splice(foundMovieIndex, 1);
    message = `Movie with an id of ${receivedProperties.id} was un-favorited`
  }

  return res.status(201).json({ message });
})

app.get('/api/v1/favorites', (request, response) => {
  response.status(200).json(app.locals.favoritedMovieIds);
})

// Declare WATCHED endpoints here 👇 (only for teams of 3)


// Listen for queries to this server
app.listen(app.get('port'), () => console.log(`${app.locals.title} is now listening on port ${app.get('port')}!`));