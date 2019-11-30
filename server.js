/* server.js nov 20 */
'use strict';
const log = console.log

const express = require('express')
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require('./JS/db/mongoose')

// import the mongoose models
const { Account } = require('./JS/models/account')
const { Place } = require('./JS/models/place')
const { Plan } = require('./JS/models/plan')
const { Profile } = require('./JS/models/profile')

// to validate object IDs
const { ObjectID } = require('mongodb')

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser') 
app.use(bodyParser.json())

// express-session for managing user sessions
const session = require('express-session')
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/PIC', express.static('PIC'))
app.use('/JS', express.static('JS'))
app.use('/CSS', express.static('CSS'))
app.use('/bootstrap-4.3.1-dist', express.static('bootstrap-4.3.1-dist'))



/*** Session handling **************************************/
// Create a session cookie
app.use(session({
    secret: 'oursecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000,
        httpOnly: true
    }
}));

// Our own express middleware to check for 
// an active user on the session cookie (indicating a logged in user.)
const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        // res.redirect('/dashboard'); // redirect to dashboard if logged in.
        res.sendFile(__dirname + '/index.html')
    } else {
        next(); // next() moves on to the route.
    }    
};

// A route to login and create a session
// app.post('/users/login', (req, res) => {
// 	const email = req.body.email
//     const password = req.body.password

//     // Use the static method on the User model to find a user
//     // by their email and password
// 	User.findByEmailPassword(email, password).then((user) => {
// 	    if (!user) {
//             res.redirect('/login');
//         } else {
//             // Add the user's id to the session cookie.
//             // We can check later if this exists to ensure we are logged in.
//             req.session.user = user._id;
//             res.redirect('/dashboard');
//         }
//     }).catch((error) => {
// 		res.status(400).redirect('/login');
//     })
// })

app.get('/', sessionChecker, (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/index.html', sessionChecker, (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/admin_main.html', sessionChecker, (req, res) => {
  res.sendFile(__dirname + '/admin_main.html')
})


/*************************************************/
// Express server listening...
const port = process.env.PORT || 3001
app.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 
