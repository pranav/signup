
var http = require('http')
var express = require('express')
var app = express()
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('signup.db')

// For the POST variables
app.use(express.bodyParser())

// Add users / projects to the database
app.post('/adduser', function(req, res) {
    project = req.body.project
    user    = req.body.user
    console.log('Added user '+user+' to project '+ project +'.')
    re = /^[0-9a-zA-Z -]+$/
    if(project != undefined && user != undefined && project.length > 2 && user.length > 3 && project.match(re) && user.match(re)) {
        db.run("INSERT INTO project VALUES('" + project + "', '" + user + "');")
        res.send({return: 0})
    } else {
        res.send({return: 1})
    }
    res.end("")
})

var projects = {}
app.get('/get', function(req, res) {
    var rows = {}
    db.each("SELECT project,user FROM project", function(err, row) {
        if(rows[row.project] == undefined) {
            rows[row.project] = new Array()
        }
        rows[row.project].push(row.user)
    }, function() {
        res.send(rows)
    })
})

app.listen(3000)
console.log('Listening on 3000')
