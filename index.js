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
        title: 'The Wedding Ringer',
        // "_id" : ObjectId("5e5aafb645b176055978609a")
        genre: {
            name: 'Comedy',
            description: 'Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect.'
        },
        year: '2015',
        director: {
            name: 'Jeremy Garelick',
            dob: '1975-11-30',
            date_died: null,
            bio: 'Jeremy graduated from Yale with degrees in Film and Theater. He began his career working as an assistant in Creative Artists Agency\'s Motion Picture Literary department before joining director Joel Schumacher as his assistant on the sets of the critically acclaimed Tigerland, Jerrys Bruckheimer\'s Bad Company.'
        },
        description: "Two weeks shy of his wedding, a socially awkward guy enters into a charade by hiring the owner of a company that provides best men for grooms in need.",
        featured: false
    },
    {
        title: 'Jaws',
        // "_id" : ObjectId("5e5aafe745b176055978609b")
        genre: {
            name: 'Thriller',
            description: 'Thriller is a genre of fiction, having numerous, often overlapping subgenres. Thrillers are characterized and defined by the moods they elicit, giving viewers heightened feelings of suspense, excitement, surprise, anticipation and anxiety.'
        },
        year: '1975',
        director: {
            name: 'Steven Spielberg',
            dob: '1946-12-18',
            date_died: null,
            bio: 'Steven Allan Spielberg is an American filmmaker. He is considered one of the founding pioneers of the New Hollywood era and one of the most popular directors and producers in film history',
        },
        description: "When a killer shark unleashes chaos on a beach community, it's up to a local sheriff, a marine biologist, and an old seafarer to hunt the beast down.",
        featured: false
    },
    {
        title: 'The Fast and the Furious',
        // "_id" : ObjectId("5e5ab00345b176055978609c")
        genre: {
            name: 'Action',
            description: 'Action film is a film genre in which the protagonist or protagonists are thrust into a series of events that typically include violence, extended fighting, physical feats, and frantic chases. Action films tend to feature a resourceful hero struggling against incredible odds, which include life-threatening situations, a villain, or a pursuit which usually concludes in victory for the hero (though a small number of films in this genre have ended in the victory for the villain instead).',
        },
        year: '2001',
        director: {
            name: 'Rob Cohen',
            dob: '1949-03-12',
            date_died: null,
            bio: 'Rob L. Cohen is an American director, producer, and screenwriter of film and television. Beginning his career as an executive producer at 20th Century Fox, Cohen produced and developed numerous high-profile film and television programs, including The Wiz, The Witches of Eastwick, and Light of Day, before concentrating full-time on directing in the 1990s.'
        },
        description: "Los Angeles police officer Brian O'Conner must decide where his loyalty really lies when he becomes enamored with the street racing world he has been sent undercover to destroy.",
        featured: false
    },
    {
        title: 'Rocky',
        // "_id" : ObjectId("5e5ab01f45b176055978609d")
        genre: {
            name: 'Drama',
            description: 'Drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. Drama of this kind is usually qualified with additional terms that specify its particular subgenre, such as "police crime drama", "political drama", "legal drama", "historical drama", "domestic drama", "teen drama" or "comedy-drama". These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods.',
        },
        year: '1976',
        director: {
            name: 'John G. Avildsen',
            dob: '1935-12-21',
            date_died: '2017-06-16',
            bio: 'John Guilbert Avildsen was an American film director. He is perhaps best known for directing Rocky (1976), which earned him the Academy Award for Best Director.'
        },
        description: "A small-time boxer gets a supremely rare chance to fight a heavy-weight champion in a bout in which he strives to go the distance for his self-respect.",
        featured: false
    },
    {
        title: 'Up',
        // "_id" : ObjectId("5e5ab03545b176055978609e")
        genre: {
            name: 'Animated',
            description: 'Animation is a method in which pictures are manipulated to appear as moving images. In traditional animation, images are drawn or painted by hand on transparent celluloid sheets to be photographed and exhibited on film.'
        },
        year: '2009',
        director: {
            name: 'Pete Docter',
            dob: '1968-10-09',
            date_died: null,
            bio: 'Peter Hans Docter is an American animator, film director, screenwriter, producer, voice actor and chief creative officer of Pixar. He is best known for directing the animated feature films Monsters, Inc. (2001), Up (2009), Inside Out (2015) and the upcoming Soul (2020), and as a key figure and collaborator at Pixar. He has been nominated for eight Oscars (two wins thus far for Up and Inside Out – Best Animated Feature), seven Annie Awards (winning five), a BAFTA Children\'s Film Award (which he won) and a Hochi Film Award (which he won).'
        },
        description: "78-year-old Carl Fredricksen travels to Paradise Falls in his house equipped with balloons, inadvertently taking a young stowaway.",
        featured: false
    },
    {
        title: 'Inception',
        // "_id" : ObjectId("5e5ab04d45b176055978609f")
        genre: {
            name: 'Thriller',
            description: 'Thriller is a genre of fiction, having numerous, often overlapping subgenres. Thrillers are characterized and defined by the moods they elicit, giving viewers heightened feelings of suspense, excitement, surprise, anticipation and anxiety.'
        },
        year: '2010',
        director: {
            name: 'Christopher Nolan',
            dob: '1970-07-30',
            date_died: null,
            bio: 'Christopher Edward Nolan, is a British-American filmmaker, who is known for making personal, distinctive films within the Hollywood mainstream. His ten films have grossed over US$4.7 billion worldwide and garnered a total of 34 Oscar nominations and ten wins.'
        },
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        featured: false
    },
    {
        title: 'The Breakfast Club',
        // "_id" : ObjectId("5e5ab06345b17605597860a0")
        genre: {
            name: 'Drama',
            description: 'Drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. Drama of this kind is usually qualified with additional terms that specify its particular subgenre, such as "police crime drama", "political drama", "legal drama", "historical drama", "domestic drama", "teen drama" or "comedy-drama". These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods.',
        },
        year: '1985',
        director: {
            name: 'John Hughes',
            dob: '1950-02-18',
            date_died: '2009-08-06',
            bio: 'John Wilden Hughes Jr. was an American filmmaker. Beginning as an author of humorous essays and stories for National Lampoon, he went on to write, produce and sometimes direct some of the most successful live-action comedy films of the 1980s and 1990s.'
        },
        description: "Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.",
        featured: false
    },
    {
        title: 'Schindler\'s List',
        // "_id" : ObjectId("5e5ab07a45b17605597860a1")
        genre: {
            name: 'Drama',
            description: 'Drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. Drama of this kind is usually qualified with additional terms that specify its particular subgenre, such as "police crime drama", "political drama", "legal drama", "historical drama", "domestic drama", "teen drama" or "comedy-drama". These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods.',
        },
        year: '1993',
        director: {
            name: 'Steven Spielberg',
            dob: '1946-12-18',
            date_died: null,
            bio: 'Steven Allan Spielberg is an American filmmaker. He is considered one of the founding pioneers of the New Hollywood era and one of the most popular directors and producers in film history',
        },
        description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
        featured: false
    },
    {
        title: 'The Shining',
        // "_id" : ObjectId("5e5ab08c45b17605597860a2")
        genre: {
            name: 'Horror',
            description: 'Horror is a genre of speculative fiction which is intended to frighten, scare, disgust, or startle its viewers by inducing feelings of horror and terror. Horror is frequently supernatural, though it might be also non-supernatural. Often the central menace of a work of horror fiction can be interpreted as a metaphor for the larger fears of a society.'
        },
        year: '1980',
        director: {
            name: 'Stanley Kubrick',
            dob: '1928-07-26',
            date_died: '1999-03-07',
            bio: 'Stanley Kubrick was an American film director, screenwriter, and producer. He is frequently cited as one of the most influential filmmakers in cinematic history. His films, which are mostly adaptations of novels or short stories, cover a wide range of genres, and are noted for their realism, dark humor, unique cinematography, extensive set designs, and evocative use of music.'
        },
        description: "A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence, while his psychic son sees horrific forebodings from both past and future.",
        featured: false
    },
    {
        title: 'Groundhog Day',
        // "_id" : ObjectId("5e5ab09b45b17605597860a3")
        genre: {
            name: 'Drama',
            description: 'Drama is a genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. Drama of this kind is usually qualified with additional terms that specify its particular subgenre, such as "police crime drama", "political drama", "legal drama", "historical drama", "domestic drama", "teen drama" or "comedy-drama". These terms tend to indicate a particular setting or subject-matter, or else they qualify the otherwise serious tone of a drama with elements that encourage a broader range of moods.',
        },
        year: '1993',
        director: {
            name: 'Harold Ramis',
            dob: '1944-11-21',
            date_died: '2014-02-24',
            bio: 'Harold Allen Ramis was an American actor, comedian, director and writer. His best-known film acting roles were as Egon Spengler in Ghostbusters (1984) and Ghostbusters II (1989) and Russell Ziskey in Stripes (1981); he also co-wrote those films.'
        },
        description: "A weatherman finds himself inexplicably living the same day over and over again.",
        featured: false
    },
];

//Creates list of users
let users = [
    {
        username: 'janedoe',
        password: 'passw0rd',
        email: 'janedoe@yahoo.com',
        dob: new Date("1985-12-15"),
        favoriteMovies: [],
    },
    {
        username: 'johndoe',
        password: '1pass1word1',
        email: 'notarealboy@gmail.com',
        dob: new Date("1986-01-18"),
        favoriteMovies: [],
    },
    {
        username: 'user1234',
        password: 'password1234',
        email: 'myemail@none.com',
        dob: new Date("2001-11-18"),
        favoriteMovies: [],
    },
    {
        username: 'someRandomdude',
        password: 'randomlyGeneratedPassword',
        email: 'randomemail@aol.com',
        dob: new Date("1995-08-27"),
        favoriteMovies: [],
    },
    {
        username: 'dmrapuano',
        password: 'fakePassw0Rd',
        email: 'dmrapuano@notanemail.com',
        dob: new Date("1992-11-04"),
        favoriteMovies: [],
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

//Shows all registered users
app.get('/accounts/users', (req, res) => {
    res.json(users);
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