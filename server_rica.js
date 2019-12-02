
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
app.set('view engine', 'hbs');



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

/*get profile*/
app.get('/getProfile',(req,res) =>{
    Profile.find({userName:req.session.userName}).then((profiles) => {
        res.send({profiles})
    },(error) => {
        res.status(500).send(error)
    })
});

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
    const userName = req.body.userName;
    const first = req.body.firstName;
    const last = req.body.lastName;
    const gender = req.body.gender;
    const dob = req.body.birthday;
    const email = req.body.email;
    const phone = req.body.phone;
    // const language = req.body.language;
    const description = req.body.description;

    //save to database
    Profile.findById(req.session.user)
        .then(profile => {
            profile.userName = userName;
            profile.firstName = first;
            profile.lastName = last;
            profile.gender = gender;
            profile.dob = dob;
            profile.email = email;
            profile.phone = phone;
            // profile.language = language;
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


/*get profile*/
// app.get('/profiles', (req, res) => {
//     /// req.params has the wildcard parameters in the url, in this case, id.
//     if (req.session.userName) {
//         Profile.findById(req.session.user)
//             .then(user => {
//                 if (!user) {
//                     res.status(404).send()
//                 } else {
//                     // res.render('view/my_profile.hbs', {
//                     //     score: user.rating,
//                     //     name: user.name,
//                     //     icon: user.icon,
//                     //     email: user.email,
//                     //     intro: user.intro
//                     })
//                 }
//             })
//             .catch(error => {
//                 res.status(400).send(error)
//             })
//     } else {
//         res.redirect('/login')
//     }
// });



/*************************************************/
// Express server listening...
const port = process.env.PORT || 3001
app.listen(port, () => {
    log(`Listening on port ${port}...`)
});
