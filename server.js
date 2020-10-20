const express = require('express');
const app = express();
const cors = require('cors');
const { request } = require('express');

// Designate the port this server will run through
app.set('port', process.env.port || 3001);

// Declare app-level middleware
app.use(express.json());
app.use(cors());

// Define the information stored in app.locals - 
// you can add as many key/value pairs to the app.locals object as you wish!
app.locals.title = 'Rancid Tomatillos Microservice Server';
app.locals.encouragement = ["You can do it!", "I believe in you!", "You got this!"];
app.locals.comments = [];
app.locals.favoriteMovieIds = [];

app.get('/', (request, response) => {
  response.send('Woohoo!')
  //whatever response we sent it is wbhat is
});

// Example GET endpoint
app.get('/api/v1/cheerleading', (request, response) => {
  response.status(200).json(app.locals.encouragement);
})

// Declare COMMENTING endpoints here 👇
//add a new comment
app.post('/api/v1/movies/:movieId/comments', (request, response) => {
  const { movieId } = request.params;
  const requiredProperties = [ "comment", "author" ];
  const receivedProperties = Object.keys(request.body);

  for (let property of requiredProperties) {
    if (!receivedProperties.includes(property)) {
      return response.status(422).json({error: `Cannot POST: missing property ${property} in request.`});
    }
  }
  const newComment = {
    ...request.body,
    movieId: +movieId,
    id: Date.now()
  }

  app.locals.comments.push(newComment);
  return response.status(201).json({ newComment: newComment });
})
//retrive comments
app.get('/api/v1/movies/:movieId/comments', (request, response) => {
  const { movieId } = request.params;

  const commentsByMovie = app.locals.comments.filter(comment => comment.movieId === +movieId)
  response.status(200).json({ comments: commentsByMovie });
})

//like movie
app.get('/api/v1/movies/:movieId/comments/:commentId', (request, response) => {
  const {movieId, commentId} = request.params;
  const comment = app.locals.comments.find(comment => comment.id === +commentId)
  response.status(201).json(comment)
})
//retrieve comment post like 
app.post('/api/v1/movies/:movieId/comments/:commentId', (request, response) => {
  const {movieId, commentId} = request.params;
  console.log(request.body)
  const comment = app.locals.comments.find(comment => comment.id === +commentId)
  console.log(comment.likeStatus)

    comment.likeStatus = request.body.likeStatus
    comment.replyCount ++
    response.status(201).json(`comment like status is ${comment.likeStatus}`)
    console.log(comment)
})

// Declare FAVORITING endpoints here 👇
app.post('/api/v1/favorites', (request, response) => {
  const requiredProperties = [ "id" ];
  const receivedProperties = Object.keys(request.body);

  for (let property of requiredProperties) {
    if (!receivedProperties.includes(property)) {
      return response.status(422).json({error: `Cannot POST: missing property ${property} in request.`});
    }
  }
  
  let message;
  const movieId = +request.body.id
  const foundMovieIndex = app.locals.favoriteMovieIds.findIndex(id => id === movieId);
  
  if (foundMovieIndex < 0) {
    app.locals.favoriteMovieIds.push(movieId);
    message = `Movie with an id of ${movieId} was favorited`
  } else {
    app.locals.favoriteMovieIds.splice(foundMovieIndex, 1);
    message = `Movie with an id of ${movieId} was un-favorited`
  }

  return response.status(201).json({ message });
})

app.get('/api/v1/favorites', (request, response) => {
  response.status(200).json(app.locals.favoriteMovieIds);
})

// Listen for queries to this server
app.listen(app.get('port'), () => console.log(`${app.locals.title} is now listening on port ${app.get('port')}!`));