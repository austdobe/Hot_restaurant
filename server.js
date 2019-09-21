// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// //emailing when ready
// var mailer = require('node-mailer');

// new mailer.Mail({
// 	from: 'noreply@domain.com',
// 	to: 'username@domain.com',
// 	subject: 'My Subject',
// 	body: 'My body',
// 	callback: function(err, data){
// 		console.log(err);
// 		console.log(data);
// 	}
// });

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var tables = [
    {
        name: "Bill Example",
        phone: "919-919-9911",
        email: "mail@mailing.com",
        uniqueID: "Example"
    }
]
var waitlist = [
    {
        name: "Henry Ford",
        phone: "919-919-9999",
        email: "ford@mailing.com",
        uniqueID: "Example2"
    }
]

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reservation", function(req, res) {
    // res.json("reservation")
    res.sendFile(path.join(__dirname, "make.html"));
});

// Displays all characters
app.get("/table", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/api/tables", function(req, res) {
    res.json(tables)
    
});
app.get("/api/wait", function(req, res) {
    res.json(waitlist)
    
});

app.post("/api/tables", function(req, res){
    var newTable = req.body;

    console.log(newTable);
    if (tables.length < 5){
        tables.push(newTable);    
    }
    else{
        waitlist.push(newTable);
    }
    

    res.json(newTable);
})

app.post("/api/wait", function(req,res){
    var newWait = req.body;

    console.log(newWait);

    waitlist.push(newWait);

    res.json(newWait);
})

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});
