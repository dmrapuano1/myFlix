//Obtains mongoose module
const mongoose = require('mongoose'),
//Obtains password encryption module
bcrypt = require('bcrypt');

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

//Hashes password
userSchema.statics.hashPassword = function(Password) {
    return bcrypt.hashSync(Password, 10);
};

//Validates hashed password with the hashed password in database 
userSchema.methods.validatePassword = function(Password) {
    return bcrypt.compareSync(Password, this.Password);
};

//Creating the model for both users and movies
var Movie = mongoose.model('Movie', movieSchema);
var User = mongoose.model('User', userSchema);

//Exporting the models from above
module.exports.Movie = Movie;
module.exports.User = User;
