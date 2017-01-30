var mongoose = require('mongoose');
//Import models
var MovProductoFinal  = require("../models/movimientoProduccionFinal").movimientoProduccionFinalModel;
var movProductoUsadoController = require("../controllers/movProductoUsadoController");

var MateriaPrima  = require("../models/materiaPrima").materiaPrimaModel;
var ProductoSemiProcesado  = require("../models/productoSemiProcesado").productoSemiProcesadoModel;
var ProductoTerminado  = require("../models/productoTerminado").productoTerminadoModel;

exports.findAll = function(req, res) {  
    MovProductoFinal.find({}).populate('materiaPrimaFinal').populate('prodSemiFinal').populate('prodTermFinal').exec(function(err, movsProductoFinal){ 
		if(err) res.send(500, err.message);

		console.log('GET/MovProductoFinal');
		res.status(200).jsonp(movsProductoFinal);
		});
};


exports.findById = function(req, res) {  
	var findByIdCallback = 
	function(err, movProductoFinal){
		if(err) return res.send(500, err.message);

		console.log('GET/MovProductoFinal/' + req.params.id);
		res.status(200).jsonp(movProductoFinal);
    };
	
    MovProductoFinal.findById(req.params.id).populate('materiaPrimaFinal').populate('prodSemiFinal').populate('prodTermFinal').exec(findByIdCallback); //luego de realizar la busqueda ejecuta el callback
};


exports.add = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var movProductoFinal = new MovProductoFinal({ //creo un nuevo movProductoFinal en base a lo recibido en el request
        materiaPrimaFinal:      req.body._id,
		prodSemiFinal:      req.body._id,	
		prodTermFinal:      req.body._id,
        fecha:                new Date(),
        cantidadFabricada:    req.body.cant,
		tipo:				  req.body.tipo,
    });

    movProductoFinal.save(function(err, movProductoFinal) { //almaceno el movProductoFinal en la base de datos
        if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(movProductoFinal);
    });
};


exports.update = function(req, res) {
	console.log('UPDATE');
    console.log(req.body);
	
    MovProductoFinal.findById(req.params.id, function(err, movProductoFinal) { //"movProductoFinal" es el objeto que me devuelve la busqueda
        
		//actualizo todos los campos de ese "movProductoFinal"
        movProductoFinal.prodSemiFinal =      req.body.productoFinalID;
		movProductoFinal.prodTermFinal =      req.body.productoFinalID;
		movProductoFinal.materiaPrimaFinal =      req.body.productoFinalID;
        movProductoFinal.fecha =                req.body.fecha;
        movProductoFinal.cantidadFabricada =  	 req.body.cantidadFabricada;
		movProductoFinal.tipo =  	 			 req.body.tipo;

        movProductoFinal.save(function(err) { //almaceno en la base "movProductoFinal" para que quede actualizada con los nuevos cambios
            if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(movProductoFinal);
        });
    });
};


exports.delete = function(req, res) {
	console.log('DELETE');	
	console.log(req.params.id);
	
    MovProductoFinal.findById(req.params.id).populate('materiaPrimaFinal').populate('prodSemiFinal').populate('prodTermFinal').exec(function(err, movProductoFinal) {
		
		var productoU = null;
		var prodModel = null;
			
		if (movProductoFinal.materiaPrimaFinal) {
			productoU = movProductoFinal.materiaPrimaFinal;
			prodModel = MateriaPrima;
		} else if (movProductoFinal.prodSemiFinal) {
			productoU = movProductoFinal.prodSemiFinal;
			prodModel = ProductoSemiProcesado;
		} else {
			productoU = movProductoFinal.prodTermFinal;
			prodModel = ProductoTerminado;
		}
			
		productoU.cantidad = productoU.cantidad - movProductoFinal.cantidadFabricada;
		
		prodModel.findById(productoU._id, function(err, producto) { //"producto" es el objeto que me devuelve la busqueda
				
				producto.cantidad = productoU.cantidad;
				producto.save();
			});
		
		movProductoUsadoController.deleteMany(req, res);
		if (res.statusCode == 200) {
			movProductoFinal.remove(function(err) {
				if(err) return res.status(500).send(err.message);
				res.status(200).send(movProductoFinal);
			});
		}
    });
};


