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

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);
app.use(express.static(__dirname + '/public'));


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

router.get('/home', function(req, res) {
  res.sendFile(path.join(__dirname, './public', 'home.html'));
});

router.get('/prueba', function(req, res) {
	res.sendFile(path.join(__dirname, './public', 'produccion.html'));
});

app.use(router);

// API routes
var usuarioRoutersHandler = require("./routersHandlers/usuarioRoutersHandler").getUsuarioRoutersHandler(express);
app.use('/api', usuarioRoutersHandler);

var clienteRoutersHandler = require("./routersHandlers/clienteRoutersHandler").getClienteRoutersHandler(express);
app.use('/api', clienteRoutersHandler);

var proveedorRoutersHandler = require("./routersHandlers/proveedorRoutersHandler").getProveedorRoutersHandler(express);
app.use('/api', proveedorRoutersHandler);

var materiaPrimaRoutersHandler = require("./routersHandlers/materiaPrimaRoutersHandler").getMateriaPrimaRoutersHandler(express);
app.use('/api', materiaPrimaRoutersHandler);

var semiProcesadoRoutersHandler = require("./routersHandlers/semiProcesadoRoutersHandler").getSemiProcesadoRoutersHandler(express);
app.use('/api', semiProcesadoRoutersHandler);

var productoTerminadoRoutersHandler = require("./routersHandlers/productoTerminadoRoutersHandler").getProductoTerminadoRoutersHandler(express);
app.use('/api', productoTerminadoRoutersHandler);

var listaPorcentajeRoutersHandler = require("./routersHandlers/listaPorcentajeRoutersHandler").getListaPorcentajeRoutersHandler(express);
app.use('/api', listaPorcentajeRoutersHandler);

var listaPrecioRoutersHandler = require("./routersHandlers/listaPrecioRoutersHandler").getListaPrecioRoutersHandler(express);
app.use('/api', listaPrecioRoutersHandler);

var movProductFinalRoutersHandler = require("./routersHandlers/movProductoFinalRoutersHandler").getMovProductoFinalRoutersHandler(express);
app.use('/api', movProductFinalRoutersHandler);

var movProductUsadoRoutersHandler = require("./routersHandlers/movProductoUsadoRoutersHandler").getMovProductoUsadoRoutersHandler(express);
app.use('/api', movProductUsadoRoutersHandler);

var facturacionDatosPropiosRoutersHandler = require("./routersHandlers/facturacionDatosPropiosRoutersHandler").getFacturacionDatosPropiosRoutersHandler(express);
app.use('/api', facturacionDatosPropiosRoutersHandler);

var documentoMercantilItemRoutersHandler = require("./routersHandlers/documentoMercantilItemRoutersHandler").getDocumentoMercantilItemRoutersHandler(express);
app.use('/api', documentoMercantilItemRoutersHandler);

var documentoMercantilRoutersHandler = require("./routersHandlers/documentoMercantilRoutersHandler").getDocumentoMercantilRoutersHandler(express);
app.use('/api', documentoMercantilRoutersHandler);

var stockRoutersHandler = require("./routersHandlers/stockRoutersHandler").getStockRoutersHandler(express);
app.use('/api', stockRoutersHandler);

// Connection to DB
mongoose.connect('mongodb://localhost/flourapp', function(err, res) {  //se conecta a la base de datos
  if(err) {
    console.log('ERROR: al conectarse con Database!' + err);
  } else {
	console.log("Connected to Database ¡OK!");
  }

  // Start server
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
});
