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

mongoose.set('useCreateIndex', true)



/*** Session handling **************************************/
// Create a session cookie
app.use(session({
    secret: 'oursecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000 * 60,
        httpOnly: true
    }
}));

// Our own express middleware to check for 
// an active user on the session cookie (indicating a logged in user.)
const sessionChecker = (req, res, next) => {
    log('checker')
    log(req.session)
    log(req.sessionID)
    if (req.session.user === undefined) {
        // res.redirect('/dashboard'); // redirect to dashboard if logged in.
        // log('go back!!!!!!')
        res.sendFile(__dirname + '/index.html')
    } else {
        next(); // next() moves on to the route.
        // res.sendFile(__dirname + '/index.html')
    }    
};

app.get('/', sessionChecker, (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/index.html', sessionChecker, (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/admin_main.html', sessionChecker, (req, res) => {
  res.sendFile(__dirname + '/admin_main.html')
})

app.get('/signup.html', sessionChecker, (req, res) => {
  res.sendFile(__dirname + '/signup.html')
})

app.get('/plan_trip.html', sessionChecker, (req, res) => {
  res.sendFile(__dirname + '/plan_trip.html')
})

app.get('/create_plan.html', sessionChecker, (req, res) => {
    // log('create_plan')
    // log(req.session)
    // log(req.sessionID)
  res.sendFile(__dirname + '/create_plan.html')
})

app.get('/user_profile.html', sessionChecker, (req, res) => {
  res.sendFile(__dirname + '/user_profile.html')
})

app.get('/my_profile.hbs', sessionChecker, (req, res) => {
  res.render('/my_profile.hbs')
})

app.get('/view_plan.html', sessionChecker, (req, res) => {
    res.sendFile(__dirname + '/view_plan.html')
});



app.post('/users/signup', (req, res) => {
    const account = new Account({
        userName: req.body.userName,
        password: req.body.password,
        type: 'normal' // normal for normal users
    })
    // log("account is " + account);
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
        })
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
    const userName = req.body.userName
    const password = req.body.password

    Account.findByUserNamePassword(userName, password).then((user) => {
        if (!user) {
            res.redirect('/login');
        } else {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.userName = user.userName
            log(req.session)
            log(req.sessionID)
            res.redirect('/plan_trip.html');
        }
    }).catch((error) => {
        res.status(400).redirect('/login');
    })
});

app.get('/users', (req, res) => {
    Account.find().then(users => {
        res.send({ users })
    }, (error) => {
        res.status(500).send(error)
    })
});

app.get('/myprofile', sessionChecker, (req, res) => {
    log('test')
    log(req.session)
    log(req.sessionID)
    Profile.findOne({userName: req.session.userName}).then(user => {
        res.send({ user })
    }, (error) => {
        res.status(500).send(error)
    })
});

app.get('/userProfile', sessionChecker, (req, res) => {
    log('userProfile')
    log(req.session)
    log(req.sessionID)
    Profile.findOne({userName: req.session.user}).then(user => {
        log(user)
        res.send({ user })
    }, (error) => {
        res.status(500).send(error)
    })
});

app.get('/profiles', (req, res) => {
    Profile.find().then((profiles) => {
        res.send({ profiles }) // can wrap in object if want to add more properties
    }, (error) => {
        res.status(500).send(error) // server error
    })
});




app.get('/plan', (req, res) => {
    Plan.find().then((plans) => {
        res.send({ plans }) // can wrap in object if want to add more properties
    }, (error) => {
        res.status(500).send(error) // server error
    })
});


app.post('/plan', (req, res) => {
    log(1);
    log(req.body);

    const plan = new Plan({
        name: req.body.name,
        creator: req.body.creator,
        places:req.body.places,
        transportation:req.body.transportation,
        cost:req.body.cost,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        poolMember: req.body.poolMember,
    });
    plan.save().then((result) => {
        res.send(result)
    }, (error) => {
        res.status(400).send(error)
    });

    log(309)
});


/*************************************************/
// Express server listening...
const port = process.env.PORT || 3001
app.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 
