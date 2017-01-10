var express = require("express"),  
    app = express(),
	path = require('path'),
    bodyParser  = require("body-parser"),
    methodOverride = require("method-override");
    mongoose = require("mongoose");
	

app.use(express.static('public'));	
	
// Middlewares
app.use(bodyParser.urlencoded({extended: false}));  
app.use(bodyParser.json());  
app.use(methodOverride());


// HTML read
var fileSystem = require("fs");

var indexHTML;
fileSystem.readFile("./public/index.html", function(err, html){
	indexHTML = html;
});
 

// Index route
var router = express.Router();

router.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, './public', 'index.html'));
});

app.use(router);

// API routes
var clienteRoutersHandler = require("./routersHandlers/clienteRoutersHandler").getClienteRoutersHandler(express);
app.use('/api', clienteRoutersHandler); 

// Connection to DB
mongoose.connect('mongodb://localhost/flourapp', function(err, res) {  //se conecta a la base de datos
  if(err) {
    console.log('ERROR: al conectarse con Database. ' + err);
  } else {
	console.log("Connected to Database ¡OK!");  
  }
  
  // Start server
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});
