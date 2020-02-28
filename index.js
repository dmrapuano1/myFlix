// Gets required modules
const express = require('express'),
morgan = require('morgan'),
bodyParser = require('body-parser'),
uuid = require('uuid');

// Sets app to use express framework from above
const app = express();

//Allows express to use bodyParser
app.use(bodyParser.json());

// Creates file of Top 10 Movies
let topMovies = [
    {
        title: 'Wedding Ringer',
        genre: 'Comedy',
        year: '2015',
        director: 'Jeremy Garelick'
    },
    {
        title: 'The Matrix',
        genre: 'Sci-fi',
        year: '1999',
        director: ['Lana Wachowski', 'Lilly Wachowski']
    },
    {
        title: 'The Fast and the Furious',
        genre: 'Action',
        year: '2001',
        director: 'Rob Cohen'
    },
    {
        title: 'Rocky',
        genre: 'Drama',
        year: '1976',
        director: 'John G. Avildsen'
    },
    {
        title: 'Up',
        genre: 'Drama',
        year: '2009',
        director: 'Pete Docter'
    },
    {
        title: 'Inception',
        genre: 'Thriller',
        year: '2010',
        director: 'Christopher Nolan'
    },
    {
        title: 'The Breakfast Club',
        genre: 'Drama',
        year: '1985',
        director: 'John Hughes'
    },
    {
        title: 'Schindler\'s List',
        genre: 'Drama',
        year: '1993',
        director: 'Steven Spielberg'
    },
    {
        title: 'The Shining',
        genre: 'Horror',
        year: '1980',
        director: 'Stanley Kubrick'
    },
    {
        title: 'Groundhog Day',
        genre: 'Drama',
        year: '1993',
        director: 'Harold Ramis'
    },
];

// Middleware that logs all navigation to webpage
app.use(morgan('common'));

// Error handling middleware
app.use(function (err, req, res, next) {
    // Sends message that something went wrong
    res.status(500);
    res.render('error', { error: err });
});
// 'webpage'/ functionality
app.get('/', function(req, res){
    res.send('Welcome to my app!');
});

//'webpage'/movies functionality
app.get('/movies', function(req, res){
    // Returns a JSON file of the topMovies variable
    res.json(topMovies);
});

// Returns individual title
app.get('/movies/:title', (req, res) => {
    res.json(topMovies.find((movie) => { 
        return movie.title === req.params.title;
    }));
});

//Returns details about a genre
app.get('/genres', (req, res) => {
    res.send('Details about each genre here');
});

//Returns bio about director
app.get('/directors/:director', (req, res) => {
    res.json(topMovies.find((movie) => {
        return movie.director === req.params.director;
    }));
});

//Create an account
app.post('/accounts/register', (req, res) => {
    res.send('Use this URL to create an account');
});

//Update account info
app.put('/accounts/:id/update', (req, res) => {
    res.send('Use this URL to update your account with id: ' + req.params.id);
});

//Delete an account (unregister) by account ID
app.delete('/users/:id', (req, res) => {
    res.send('Account will be deleted as soon as I write the code for it');
});

//Add movies to account
app.put('/users/:id/:movie', (req, res) => {
    res.send('Adds ' + req.params.movie + ' to account with ID: ' + req.params.id);
});

app.delete('/users/:id/:movie', (req, res) => {
    res.send(req.params.movie + ' will be deleted from list of user with id of ' + req.params.id);
});

//'webpage'/documentation (or any file in public folder) functionality
app.use(express.static('public'));

app.listen(8080);

console.log('App is working on 8080')