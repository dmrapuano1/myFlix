var jwtSecret = 'your_jwt_secret';
var jwt = require('jsonwebtoken');
const passport = require('passport');
//local passport file
require('./passport');

function generateJWTToken(user) {
    return jwt.sign(user, jwtSecret, {
        //Encoding username in the JWT
        subject: user.Username,
        //Specifying how long the token is good for
        expiresIn: '7d',
        //Algorithm used to encode JWT values
        algorithm: 'HS256'
    });
};


//Post login
module.exports = (router) => {
    router.post('/login', (req, res) =>{
        passport.authenticate('local', {session : false}, (error, user, info) => {
            if (error || !user) {
                return res.status(400).json({
                    message: 'Something is not right', 
                    user: user
            });
            }
            req.login(user, {session: false}, (error) => {
                if (error) {
                    res.send(error);
                };
                var token = generateJWTToken(user.toJSON());
                return res.json({user, token});
            });
        })(req, res);
    });
};