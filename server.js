var express = require('express');
var app = express();

var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://wpdba:lim1t<$Plz@ds045097.mongolab.com:45097/wpostdb', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());

// models ----------------------------------------------------------
var UserModel = mongoose.model('users', { fname: String, lname: String});

// routes ----------------------------------------------------------
app.get('/api/users', function(req, res){
	UserModel.find(function(err, retval){
		if(err){
			res.send(err);
		}else{
			res.json(retval);
		}
	});
});
app.get('/api/users/:userid', function(req, res){
	UserModel.find({
		_id : req.params.userid
	}, function(err, retval){
		if(err){
			res.send(err);
		}else{
			res.json(retval);
		}
	});
});
app.post('/api/users', function(req, res){
	console.log('req.body: ' + req.body.fname);
	UserModel.create({
		fname: req.body.fname,
		lname: req.body.lname
	}, function(err, retval){
		if(err){
			res.send(err);
		}else{
			res.json(retval);
		}
	});
});
app.delete('/api/users/:userid', function(req, res){
	UserModel.remove({
		_id: req.params.userid
	}, function(err, retval){
		if(err){
			res.send(err);
		}else{
			res.json(retval);
		}
	});
});

// application ------------------------------------------------------
app.get('*', function(req, res){
	res.sendfile('./public/index.html');
});	

app.listen(666);
console.log("App listening on port 666");