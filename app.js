const mongo = require("./database/mongo");
const express = require('express')
const bodyParser = require('body-parser')
const logger = require("./utils/logger");

mongo.createConnection().then((_) => logger.info("MongoDB connected"));

const admin = require('./routes/routes_auth')

app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/admin', admin)

require('http').createServer();
const port = 5013

app.listen(port, function(){
    console.log('Listening on port ' + port);
});

console.log("Connected to server");

module.exports = app;

