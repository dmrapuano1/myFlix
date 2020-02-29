//Requires module for file
const mongoose = require('mongoose');

//Creates movie Schema for mongoose to read
var movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
        Name: String,
        Description: String,
    },
    Director: {
        Name: String,
        Description: String,
    },
    ImagePath: String,
    Featured: Boolean
});

//Creates user Schema for mongoose to read
var userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

//Creating the model for both users and movies
var Movie = mongoose.model('Moive', movieSchema);
var User = mongoose.model('User', userSchema);

//Exporting the models from above
module.exports.Movie = Movie;
module.exports.User = User;
