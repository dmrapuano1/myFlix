// Gets required modules
const express = require('express'),
morgan = require('morgan'),
bodyParser = require('body-parser'),
uuid = require('uuid'),
mongoose = require('mongoose'),
Models = require('./models.js')

// Sets app to use express framework from above
const app = express();

//Allows express to use bodyParser
app.use(bodyParser.json());

//Pulls movies and users from models.js
const Movies = Models.Movie;
const Users = Models.User

//Connects mongoose to the MongoDB needed (myFlixDB)
mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true});

// Middleware that logs all navigation to webpage
app.use(morgan('common'));

// Error handling middleware
app.use(function (err, req, res, next) {
    // Sends message that something went wrong
    res.status(500);
    res.render('error', { error: err });
});

// 'webpage'/ functionality
app.use(express.static('welcome'));

//Returns a list of all movies to the user
app.get('/movies', (req, res) => {
    //Find all movies in database
    Movies.find()
    .then(function(movies){
        //Returns movies to user
        res.status(201).json(movies)
    })
    //Catch for all errors
    .catch(function(error){
        console.error(error);
        res.status(500).send('Error ' + error);
    });
});

// Returns individual title
app.get('/movies/:Title', (req, res) => {
    //Returns target movie from database
    Movies.find({title: req.params.Title})
    .then(function(movie) {
        res.status(201).json(movie);
    })
    //Catch for all errors
    .catch(function(error) {
        console.error(error);
        res.status(500).send('Error ' + error);
    });
});

//Returns details about all genres
app.get('/genres', (req, res) => {
    //Syntax to find all and return only the genre portion
    Movies.find({}, 'genre')
    .then(function(genres) {
        res.status(201).json(genres)
    })
    .catch(function(error){
        console.error(error);
        res.status(500).send('Error ' + error);
    });
});

//Returns details on singular genre
app.get('/genres/:Genre', (req, res) => {
    //Finds genre in movies object
    Movies.findOne({'genre.name': req.params.Genre}, 'genre')
    .then(function(genre) {
        res.status(201).json(genre);
    }).catch((error) => {
        console.error(error);
        res.status(500).send('Error ' + error);
    })
});

//Returns details about all directors
app.get('/directors', (req, res) => {
    Movies.find({}, 'director')
    .then(function(director) {
        res.status(201).json(director)
    })
    .catch(function(error){
        console.error(error);
        res.status(500).send('Error ' + error);
    });
});

//Returns bio and details on a single director
app.get('/directors/:Director', (req, res) => {
    //Finds genre in movies object
    Movies.findOne({'director.name': req.params.Director}, 'director')
    .then(function(director) {
        res.status(201).json(director);
    }).catch((error) => {
        console.error(error);
        res.status(500).send('Error ' + error);
    })
});

//Get all registered users
app.get('/users', (req, res) => {
    //Finds all users in database
    Users.find()
    //Returns all users found
    .then(function(users){
        res.status(201).json(users)
    })
    //Catch for all errors
    .catch(function(error){
        console.error(error);
        res.status(500).send('Error ' + error);
    });
});

//Get account by username
app.get('/users/:Username', (res, req) => {
    //Look through database for username input by user
    Users.findOne({Username: req.params.Username})
    //Returns user with requested username
    .then(function(user) {
        res.status(201).json(user)
    })
    //Catch for all errors
    .catch(function(error) {
        console.error(error);
        res.status(500).send('Error ' + error);
    });
});

//Update user's info by username
app.put('/users/:Username', function(req, res) {
    //Pulls all users with :username
    Users.findOneAndUpdate({Username: req.params.Username}, 
        //Sets user's info to body of request
        {$set: {
            Username : req.body.Username,
            Password : req.body.Password,
            Email : req.body.Email,
            Birthday : req.body.Birthday
        }},
        //States you want the document to be returned
        {new: true},
        function(error, updatedUser) {
            //Catch for errors
            if (error) {
                console.error(error);
                res.status(500).send('Error ' + error);
            } else {
                //Returns user with updated information
                res.status(201).json(updatedUser)
            };
        })
});

//Creates an account
/*  
    Expected JSON format:
    {
    ID : Integer, (to be created by database)
    Username : String,
    Password : String,
    Email : String,
    Birthday : Date
    }
*/
app.post('/accounts', (req, res) => {
    //Runs findOne on database to determine if username is already in database
    Users.findOne({Username: req.body.Username}).then(function(user){
        if (user){
            //Returns error if selected username already exists in database
            return res.status(400).send(req.body.User + ' already exists. Try another username.');
        } else {
            //Creates user if new username using same setup from models.js (note ID is missing on purpose)
            Users.create({
                Username: req.body.Username,
                Password: req.body.Password,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            })
            //Displays to user that the user has been created
            .then(function(user) {res.status(201).json(user)})
            //Catch for errors on creation of user
            .catch(function(error) {
                console.error(error);
                res.status(500).send('Error ' + error);
            })
        };
    //Catch for all errors outside creation of user
    }).catch(function(error){
        console.error(error);
        res.status(500).send('Error ' + error);
    });
});

//Delete an account (unregister) by account ID
app.delete('/users/:Username', (req, res) => {
    Users.findByIdAndRemove({Username: req.params.Username})
    .then(function(user) {
        if (!user) {
            res.status(400).send('Username ' + req.params.Username + ' was not found.');
        } else {
            res.status(200).send(req.params.Username + ' was deleted.');
        }
    })
    .catch(function (error) {
        console.error(error);
        res.status(500).send('Error ' + error);
    });
});

//Pulls a user's favorite list
app.get('/users/:Username/movies', (res, req) => {
    //Look through database for username input by user
    Users.findOne({Username: req.params.Username})
    //Returns user's movie list
    .then(function(user) {
        res.status(201).json(user.FavoriteMovies)
    })
    //Catch for all errors
    .catch(function(error) {
        console.error(error);
        res.status(500).send('Error ' + error);
    });
});

//Adds movie to user's favorite list
app.post('/users/:Username/movies/:MovieID', function(req, res) {
    Users.findOneAndUpdate({Username: req.params.Username},
        {$push: {FavoriteMovies: req.params.MovieID}},
        {new: true},
        function(error, updatedUser) {
            if (error) {
                console.error(error);
                res.status(500).send('Error ' + error)
            } else {
                res.status(201).json(updatedUser);
            };
        })
});

//'webpage'/documentation (or any file in public folder) functionality
app.use(express.static('public'));

app.listen(8080);

console.log('App is working on 8080')