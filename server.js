var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var PROJECTS_COLLECTION = "projects";

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = database;
  console.log("Database connection ready");

  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});

// Project API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/project"
 *    GET: finds all project
 *    POST: creates a new contact
 */

app.get("/projects", function(req, res) {
  db.collection(PROJECTS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get projects.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/projects", function(req, res) {
  var newProject = req.body;
  newProject.createDate = new Date();
  console.log(req.body)

  if (!(req.body.name || req.body.required)) {
    handleError(res, "Invalid user input", "Must provide a project name and donation amount.", 400);
  }

  db.collection(PROJECTS_COLLECTION).insertOne(newProject, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new projects.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/contacts/:id"
 *    GET: find project by id
 *    PUT: update project by id
 *    DELETE: deletes project by id
 */

app.get("/projects/:id", function(req, res) {
  db.collection(PROJECTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/projects/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(PROJECTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      res.status(204).end();
    }
  });
});

app.delete("/project/:id", function(req, res) {
  db.collection(PROJECTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(204).end();
    }
  });
});
