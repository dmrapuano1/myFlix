// Gets required modules
const express = require('express'),
morgan = require('morgan'),
bodyParser = require('body-parser'),
uuid = require('uuid'),
mongoose = require('mongoose'),
Models = require('./models.js'),
passport = require('passport'),
cors = require('cors');

// Sets use of express framework
const app = express();

//Allows express to use bodyParser
app.use(bodyParser.json());

//Pulls in auth.js functionality
var auth = require('./auth')(app);

//Pulls in passport.js functionality
require('./passport');

//Has express use CORS
app.use(cors());

//Requires express validator
const { check, validationResult } = require('express-validator');

//Pulls movies and users from models.js
const Movies = Models.Movie;
const Users = Models.User

//Connects mongoose to the MongoDB needed (myFlixDB)
// mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true});
//Connects mongoose to online db instead of localhost (note process.env.CONNECTION_URI is a way to keep information secure)
mongoose.connect(process.env.CONNECTION_URI, {useNewUrlParser: true});

// Middleware that logs all navigation to webpage
app.use(morgan('common'));

// Error handling middleware
app.use(function (err, req, res, next) {
    // Sends message that something went wrong
    res.status(500);
    res.render('error', { error: err });
});

// 'webpage/' functionality
app.use(express.static('welcome'));

//Returns a list of all movies to the user
app.get('/movies', passport.authenticate('jwt', {session: false}), (req, res) => {
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
app.get('/movies/:Title', passport.authenticate('jwt', {session: false}), (req, res) => {
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
app.get('/genres', passport.authenticate('jwt', {session: false}), (req, res) => {
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
app.get('/genres/:Genre', passport.authenticate('jwt', {session: false}), (req, res) => {
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
app.get('/directors', passport.authenticate('jwt', {session: false}), (req, res) => {
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
app.get('/directors/:Director', passport.authenticate('jwt', {session: false}), (req, res) => {
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
app.get('/users', passport.authenticate('jwt', {session: false}), (req, res) => {
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
app.get('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
    //Look through database for username input by user
    Users.find({Username: req.params.Username})
    //Returns user with requested username
    .then(function(user) {
        if (!user) {
            res.status(400).send('Username ' + req.params.Username + ' was not found.');
        } else {
            res.status(200).json(user);
        }
    })
    //Catch for all errors
    .catch(function(error) {
        console.error(error);
        res.status(500).send('Error ' + error);
    });
});

//Update user's info by username
app.put('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
    //Form validator for input fields
    //Checks username >= 5 characters
    [check('Username', 'Username is required to be at least 5 characters.').isLength({min:5}),
    //Ensures username is alpha-numeric
    check('Username', 'Username can only contain alpha-numeric characters.').isAlphanumeric(),
    //Ensures password is not empty
    check('Password', 'Password is required').not().isEmpty(),
    //Ensures email is valid form
    check('Email', 'Invalid email. PLease enter a valid email address.').isEmail()    
    ],(req, res) => {
        //Checks validations for errors
        var errors = validationResult(req);

        //If there are errors, returns those errors
        if(!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        };
    }
    //hashes entered password
    var hashedPassword = Users.hashPassword(req.body.Password);
    
    //Pulls all users with :username
    Users.findOneAndUpdate({Username: req.params.Username}, 
        {$set: {
            Username: req.body.Username,
            Password : req.body.Password,
            Email : req.body.Email,
            Birthday : req.body.Birthday
        }},
        //States you want the document to be returned
        {new: true})
        .then(function(updatedUser) {
            //Returns user with updated information
            res.status(201).json(updatedUser)
        })
        .catch(function(error) {
            console.error(error);
            res.status(500).send('Error ' + error);
        });
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
    //Form validator for input fields
    //Checks username >= 5 characters
    [check('Username', 'Username is required to be at least 5 characters.').isLength({min:5}),
    //Ensures username is alpha-numeric
    check('Username', 'Username can only contain alpha-numeric characters.').isAlphanumeric(),
    //Ensures password is not empty
    check('Password', 'Password is required').not().isEmpty(),
    //Ensures email is valid form
    check('Email', 'Invalid email. PLease enter a valid email address.').isEmail()    
    ],(req, res) => {
        //Checks validations for errors
        var errors = validationResult(req);

        //If there are errors, returns those errors
        if(!errors.isEmpty()) {
            return res.status(422).json({errors: errors.array()});
        };
    }
    //hashes entered password
    var hashedPassword = Users.hashPassword(req.body.Password);
    
    //Runs findOne on database to determine if username is already in database
    Users.findOne({Username: req.body.Username})
    .then(function(user){
        if (user){
            //Returns error if selected username already exists in database
            return res.status(400).send(req.body.User + ' already exists. Try another username.');
        } else {
            //Creates user if new username using same setup from models.js (note ID is missing on purpose)
            Users
            .create({
                Username: req.body.Username,
                Password: hashedPassword,
                Email: req.body.Email,
                Birthday: req.body.Birthday
            })
            //Displays to user that the user has been created
            .then(function(user) {res.status(201).json({user})})
            //Catch for errors on creation of user
            .catch(function(error) {
                console.error('here' + error);
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
app.delete('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
    Users.findOneAndRemove({Username: req.params.Username})
    .then(function(user) {
        console.log(user);
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
app.get('/users/:Username/movies', passport.authenticate('jwt', {session: false}), (req, res) => {
    //Look through database for username input by user
    Users.findOne({Username: req.params.Username})
    //Returns user's movie list
    .then(function(movieList) {
        res.status(201).json(movieList);
    })
    //Catch for all errors
    .catch(function(error) {
        console.error(error);
        res.status(500).send('Error ' + error);
    });
});

//Adds movie to user's favorite list
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
    var hashedPassword = checkFields(req, res);
    Users.findOneAndUpdate({Username: req.params.Username},
        //Add movie into list
        {$push: {FavoriteMovies: req.params.MovieID}},
        {new: true})
        .then(function(updatedUser) {
            //Send updated list to user
            res.status(201).json(updatedUser);
        })
        .catch(function(error) {
            console.log(error);
            res.status(500).send('Error ' + error);
        });
});

//Deletes movie from user's favorite list
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
    //Updates the movie list to not have selected movie
    Users.findOneAndUpdate({Username: req.params.Username},
        //pulls all instances of :MovieID
        {$pull: {FavoriteMovies: req.params.MovieID}},
        {new: true})
        .then(function(updatedUser) {
            //Returns updated list
            res.status(201).json(updatedUser);
        })
        .catch(function(error) {
            console.log(error);
            res.status(500).send('Error ' + error);
        });
});

//'webpage'/documentation (or any file in public folder) functionality
app.use(express.static('public'));

//Having the app listen on a free port
var port = process.env.PORT || 3000
app.listen(port, "0.0.0.0", function() {
    //Visual sign the app has started in console
    console.log(`Listening on Port ${port}`)
});