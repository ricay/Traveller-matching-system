/* server.js nov 20 */
'use strict';
const log = console.log;

const express = require('express');
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require('./JS/db/mongoose');

// import the mongoose models
const { Account } = require('./JS/models/account');
const { Place } = require('./JS/models/place');
const { Plan } = require('./JS/models/plan');
const { Profile } = require('./JS/models/profile');

// to validate object IDs
const { ObjectID } = require('mongodb');

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require('express-session');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/PIC', express.static('PIC'));
app.use('/JS', express.static('JS'));
app.use('/CSS', express.static('CSS'));
app.use('/bootstrap-4.3.1-dist', express.static('bootstrap-4.3.1-dist'));

mongoose.set('useCreateIndex', true);



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

const adminSessionChecker = (req, res, next) => {
    if (req.session.account) {
        res.sendFile(__dirname + '/admin_main.html')
    } else {
        next(); // next() moves on to the route.
    }
};

app.get('/', sessionChecker, (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.get('/index.html', sessionChecker, (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

app.get('/signup.html', sessionChecker, (req, res) => {
  res.sendFile(__dirname + '/signup.html')
});

app.get('/plan_trip.html', sessionChecker, (req, res) => {
  res.sendFile(__dirname + '/plan_trip.html')
});

app.get('/admin_login.html', adminSessionChecker, (req, res) => {
    res.sendFile(__dirname + '/admin_login.html')
});

app.get('/admin_main.html', adminSessionChecker, (req, res) => {
    res.sendFile(__dirname + '/admin_main.html')
});

app.get('/admin_insert_recommendation.html', adminSessionChecker, (req, res) => {
    res.sendFile(__dirname + '/admin_insert_recommendation.html')
});

app.get('/admin_validate_users.html', adminSessionChecker, (req, res) => {
    log(req.session.account);
    res.sendFile(__dirname + '/admin_validate_users.html')
});

app.get('/admin_delete_plan.html', adminSessionChecker, (req, res) => {
    res.sendFile(__dirname + '/admin_delete_plan.html')
});

app.post('/users/signup', (req, res) => {
    log(1);
    log(req.body);

    const account = new Account({
        userName: req.body.userName,
        password: req.body.password,
        type: 'normal' // normal for normal users
    });
    log("account is " + account);
    account.save().then((result) => {
        res.send(result)
    }, (error) => {
        res.status(400).send(error)
    });
    log(309)
});


app.post('/admin/login', (req, res) => {
    Account.findByUserNamePassword(req.body.userName, req.body.password).then((account) => {
        if (!account) {
            res.status(404).send()
        } else {
            req.session.account = account._id;
            log(req.session.account);
            res.status(200).send()
        }
    }).catch((error) => {
        res.status(400).send(error)
    })
});


/*************************************************/
// Express server listening...
const port = process.env.PORT || 3001;
app.listen(port, () => {
	log(`Listening on port ${port}...`)
});
