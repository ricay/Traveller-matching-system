
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
const { ObjectID } = require('mongodb');

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser');
app.use(bodyParser.json())

// express-session for managing user sessions
const session = require('express-session');
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
    if (!req.session.profile_id) {
        // res.redirect('/dashboard'); // redirect to dashboard if logged in.
        res.sendFile(__dirname + '/index.html')
    } else {
        next(); // next() moves on to the route.
    }
};


app.get('/', sessionChecker, (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.get('/index.html', sessionChecker, (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


//a route to user_profile
app.put('/editProfiles', (req, res) =>{

    // const profile = new Profile({
    //     user: req.body.username,
    //     gender: req.body.gender,//type:radio
    //     dob: req.body.birthday,
    //     email: req.body.email,
    //     phone: req.body.phone,
    //     language: req.body.language,
    //     description: req.body.description,
    // })
    const user = req.body.userName;
    const first = req.body.firstName;
    const last = req.body.lastName;
    const gender = req.body.gender;
    const dob = req.body.birthday;
    const email = req.body.email;
    const phone = req.body.phone;
    const language = req.body.language;
    const description = req.body.description;

    //save to database
    Profile.findById(req.session.profile_id)
        .then(profile => {
            profile.userName = user;
            profile.firstName = first;
            profile.lastName = last;
            profile.gender = gender;
            profile.dob = dob;
            profile.email = email;
            profile.phone = phone;
            profile.language = language;
            profile.description = description;

            profile.save().then(
                user_returned => {
                    if (!user_returned) {
                        res.status(500).send()
                    } else {
                        res.status(200).send()
                    }
                })
                .catch(err => res.status(500).send())
        })
});

app.get('/profiles', (req, res) => {
    Profile.find().then((profiles) => {
        res.send({ profiles }) // can wrap in object if want to add more properties
    }, (error) => {
        res.status(500).send(error) // server error
    })
});

/*get profile*/
app.get('/profiles/:id', (req, res) => {
    /// req.params has the wildcard parameters in the url, in this case, id.
    // log(req.params.id)
    const id = req.params.id;

    // Good practise: Validate id immediately.
    if (!ObjectID.isValid(id)) {
        res.status(404).send()  // if invalid id, definitely can't find resource, 404.
    }

    // Otherwise, findById
    Profile.findById(id).then((profiles) => {
        if (!profiles) {
            res.status(404).send()  // could not find this student
        } else {
            /// sometimes we wrap returned object in another object:
            //res.send({student})
            res.send(profiles)
        }
    }).catch((error) => {
        res.status(500).send()  // server error
    })
});






/*************************************************/
// Express server listening...
const port = process.env.PORT || 3001
app.listen(port, () => {
    log(`Listening on port ${port}...`)
});
