# Rancid Tomatillos Microservice starter 

This is a microservice repository you will use to create your Rancid Tomatillos solo iterations.

While you are welcome to make changes to the server, you will not need to for these iterations.

## Set Up

If you haven't already installed Nodemon globally on your computer, run the following script: `$ npm install -g nodemon`

This allows you to hot-reload the server as your are developing (rather than needing to kill the server and restart every time you make a change).

1. Clone down this repo.
1. Change into the repo and install dependencies.
1. To run the server without needing hot reloading, use the start script `$ npm start`.
1. To run the server while actively developing on the BE (when you need hot reloading), use the start script `$ npm run dev`.

## Endpoints

The server will run locally on `http://localhost:3001`

| URL Path  | Verb | Required Data | Sample Response (Happy Path) |
|-----------|------|---------------|------------------------------|
| `/api/v1/movies/:id/comments` | GET | N/A | `{comments: [{comment:<String>, author: <String>, movieId: <Number>, id: <Number>}, {...}, ...] }`  |
| `/api/v1/movies/:id/comments` | POST | `{ comment: <String>, author: <String>}` | `{newComment: {comment:<String>, author: <String>, movieId: <Number>, id: <Number>}}`  |
| `/api/v1/favorites` | GET | N/A | `[movieId<Number>, ...]`  |
| `/api/v1/favorites` | POST | `{ id: <Number>}` | `{message: "Movie with an id of <id> was (un)favorited}`  |

## Deployment 
If you choose to deploy this repo, make sure to push it up toi a new remote  

For deployment with Heroku (recommended), you'll want to follow these instructions:
- [Getting started on heroku with node js](https://devcenter.heroku.com/articles/getting-started-with-nodejs?singlepage=true)
  - only worry about the instructions through "View Logs"


## Links

- [Rancid Tomatillos spec](https://frontend.turing.io/projects/module-3/rancid-tomatillos-v2.html)
