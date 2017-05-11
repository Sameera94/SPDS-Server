var express = require('express');
var app = express();
var port = process.env.PORT || 3001;
var mongoose = require('mongoose');
var Task = require('./api/models/todoListModel');
var User = require('./api/models/userModel');
var bodyParser = require('body-parser');
var cors = require('cors')

//Mongoose configurations
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/AtsDB');

//Bodyparser Configurations
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Allow for cross
app.use(cors());

//Initialize Routes
var routes = require('./api/routes/routes');
routes(app);

//404 error page
app.use(function (req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'});
});

//Start Server
app.listen(port);
console.log('~~~ SPDS API Server Running on port ' + port + ' ~~~');