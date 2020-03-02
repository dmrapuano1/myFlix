const passport = require('passport'),
LocalStrategy = require('passport-local').Strategy,
Models = require('./models.js'),
passportJWT = require('passport-jwt');

var Users = Models.User;
var JWTStrategy = passportJWT.Strategy;
var ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
    usernameField: 'Username',
    passwordField: 'Password'
}, (Username, Password, callback) => {
    console.log(Username + ' ' + Password);
    Users.findOne({Username: Username}, (error, users) => {
        if (error) {
            console.log(error);
            return callback(error);
        }
        if (!user) {
            console.log('Incorrect username');
            return callback(null, false, {message: 'Incorrect Username or password.'});
        }
        console.log('Finished');
        return callback(null, user);
    });
}));

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
}, (jwtPayload, callback) => {
    return Users.findById(jwtPayload._id)
    .then((user) => {
        return callback(null, user);
    });
    .catch((error) => {
        return callback(error)
    });
}));