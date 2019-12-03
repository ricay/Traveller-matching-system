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

app.get('/plan_trip.html', (req, res) => {
    res.sendFile(__dirname + '/plan_trip.html')
});

app.get('/user_profile.html', (req, res) => {
    res.sendFile(__dirname + '/user_profile.html')
});

app.get('/my_profile.html', (req, res) => {
    res.sendFile(__dirname + '/my_profile.html')
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
    // log(req.session.account);
    res.sendFile(__dirname + '/admin_validate_users.html')
});

app.get('/admin_delete_plan.html', adminSessionChecker, (req, res) => {
    res.sendFile(__dirname + '/admin_delete_plan.html')
});

app.post('/index/onload', (req, res) => {
    const newAdmin = new Account({
        userName: req.body.userName,
        password: req.body.password,
        type: req.body.type
    });
    newAdmin.save().then((result) => {
        res.send(result);
    }, (error) => {
        res.status(400).send(error);
    })
});

app.post('/users/signup', (req, res) => {
    const account = new Account({
        userName: req.body.userName,
        password: req.body.password,
        type: 'normal' // normal for normal users
    });
    account.save().then((result) => {
        const profile = new Profile({
            userName: req.body.userName,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            gender: req.body.gender,
            birthday: '',
            email: req.body.email,
            phone: req.body.phone,
            language: '',
            description: ''
        });
        profile.save().then((result) => {
            res.send(result)
        }, (error) => {
            res.status(400).send(error)
        })
    }, (error) => {
        res.status(400).send(error)
    })
});

app.post('/users/login', (req, res) => {
    const userName = req.body.userName;
    const password = req.body.password;

    Account.findByUserNamePassword(userName, password).then((user) => {
        if (!user) {
            res.redirect('/login');
        } else {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.userName = user.userName;
            // log(req.session);
            // log(req.sessionID);
            res.redirect('/plan_trip.html');
        }
    }).catch((error) => {
        res.status(400).redirect('/login');
    })
});


/*get profile*/
app.get('/getProfile',(req,res) =>{
    Profile.findOne({userName:req.session.userName}).then((profile) => {
        console.log(req.session.userName);
        console.log(profile);
        res.send({ profile })
    },(error) => {
        res.status(500).send(error)
    })
});

//a route to user_profile
app.put('/editProfile', (req, res) => {
    const userName = req.body.userName;
    const first = req.body.firstName;
    const last = req.body.lastName;
    const gender = req.body.gender;
    const dob = req.body.birthday;
    const email = req.body.email;
    const phone = req.body.phone;
    // const language = req.body.language;
    const description = req.body.description;
    log(req.session.userName);

    //save to database
    Profile.findOne({userName:req.session.userName}).then(profile => {
        log(profile);
        if (!profile) {
            res.status(404).send()
        } else {

            profile.userName = userName;
            profile.firstName = first;
            profile.lastName = last;
            profile.gender = gender;
            profile.birthday = dob;
            profile.email = email;
            profile.phone = phone;
            // profile.language = language;
            profile.description = description;

            profile.save().then((result) => {
                res.send({result});
            }, (error) => {
                res.status(404).send(error)
            });
        }
    }).catch((error) => {
        log(2);
        res.status(500).send()
    });
});


app.post('/admin/login/:userName/:password', (req, res) => {
    const userName = req.params.userName;
    const password = req.params.password;

    Account.findByUserNamePassword(userName, password).then((account) => {
        if (!account) {
            res.status(404).send()
        } else {
            // req.session.account = account._id;
            // log(req.session.account);
            res.status(200).send()
        }
    }).catch((error) => {
        res.status(400).send(error)
    })
});


app.get('/admin/getUsers', (req, res) => {
    Profile.find().then((profiles) => {
        res.send({ profiles }) // can wrap in object if want to add more properties
    }, (error) => {
        res.status(500).send(error) // server error
    })
});

app.delete('/admin/deleteUser/:userName', (req, res) => {
    const userName = req.params.userName;
    // Delete account
    Account.deleteByUserName(userName).then((account) => {
        log(account);
        if (!account) {
            res.status(404).send()
        }
        else {
            res.status(200).send()
        }
    }).catch((error) => {
        res.status(500).send()
    });

    // Delete profile
    Profile.deleteByUserName(userName).then((profile) => {
        log(profile);
        if (!profile) {
            res.status(404).send()
        }
        else {
            res.status(200).send()
        }
    }).catch((error) => {
        res.status(500).send()
    })
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 3001;
app.listen(port, () => {
    log(`Listening on port ${port}...`)
});
