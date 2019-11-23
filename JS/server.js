/* server.js nov 18 */
'use strict';
const log = console.log;

const express = require('express');
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose');

// import the mongoose models
const { Student } = require('./models/student');

// to validate object IDs
const { ObjectID } = require('mongodb');

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser');
app.use(bodyParser.json());


/*** Webpage routes below **********************************/

// static js directory
app.use("/js", express.static(__dirname + '/public/js'));

// route for root
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/dashboard.html')
});

/*********************************************************/

/*** API Routes below ************************************/

/** Student resource routes **/
// a POST route to *create* a student
app.post('/students', (req, res) => {
	// log(req.body)

	// Create a new student using the Student mongoose model
	const student = new Student({
		name: req.body.name,
		year: req.body.year
	});

	// Save student to the database
	student.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
});

// a GET route to get all students
app.get('/students', (req, res) => {
	Student.find().then((students) => {
		res.send({ students }) // can wrap in object if want to add more properties
	}, (error) => {
		res.status(500).send(error) // server error
	})
});

/// a GET route to get a student by their id.
// id is treated as a wildcard parameter, which is why there is a colon : beside it.
// (in this case, the database id, but you can make your own id system for your project)
app.get('/students/:id', (req, res) => {
	/// req.params has the wildcard parameters in the url, in this case, id.
	// log(req.params.id)
	const id = req.params.id;

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
	}

	// Otherwise, findById
	Student.findById(id).then((student) => {
		if (!student) {
			res.status(404).send()  // could not find this student
		} else {
			/// sometimes we wrap returned object in another object:
			//res.send({student})
			res.send(student)
		}
	}).catch((error) => {
		res.status(500).send()  // server error
	})

});

/// a DELETE route to remove a student by their id.
app.delete('/students/:id', (req, res) => {
	const id = req.params.id;

	// Validate id
	if (!ObjectID.isValid(id)) {
		res.status(404).send()
	}

	// Delete a student by their id
	Student.findByIdAndRemove(id).then((student) => {
		if (!student) {
			res.status(404).send()
		} else {
			res.send(student)
		}
	}).catch((error) => {
		res.status(500).send() // server error, could not delete.
	})
});

// a PATCH route for changing properties of a resource.
// (alternatively, a PUT is used more often for replacing entire resources).
app.patch('/students/:id', (req, res) => {
	const id = req.params.id;

	// get the updated name and year only from the request body.
	const { name, year } = req.body;
	const body = { name, year };

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
	}

	// Update the student by their id.
	Student.findByIdAndUpdate(id, {$set: body}, {new: true}).then((student) => {
		if (!student) {
			res.status(404).send()
		} else {
			res.send(student)
		}
	}).catch((error) => {
		res.status(400).send() // bad request for changing the student.
	})

});


/*************************************************/
// Express server listening...
const port = process.env.PORT || 3001;
app.listen(port, () => {
	log(`Listening on port ${port}...`)
});

