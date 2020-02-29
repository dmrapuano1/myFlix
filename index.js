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
app.get('/users/:username', (res, req) => {
    //Look through database for username input by user
    Users.findOne({Username: req.params.Username})
    //Returns user with requested username
    .then(function(user) {
        res.json(user)
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
                res.json(updatedUser)
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