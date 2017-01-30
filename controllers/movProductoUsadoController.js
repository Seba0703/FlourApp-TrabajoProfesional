var mongoose = require('mongoose');
//Import models
var MovProductoUsado  = require("../models/movimientoProduccionUsado").movimientoProduccionUsadoModel;
var MateriaPrima  = require("../models/materiaPrima").materiaPrimaModel;
var ProductoSemiProcesado  = require("../models/productoSemiProcesado").productoSemiProcesadoModel;
var ProductoTerminado  = require("../models/productoTerminado").productoTerminadoModel;

exports.findAll = function(req, res) {  
    MovProductoUsado.find({}).populate('materiaPrimaUsada').populate('prodSemiUsado').populate('prodTermUsado').exec(function(err, movsProductoUsado){ 
		if(err) res.send(500, err.message);

		console.log('GET/MovProductoUsado');
		res.status(200).jsonp(movsProductoUsado);
		});
};


exports.findById = function(req, res) {  
	var findByIdCallback = 
	function(err, movProductoUsado){
		if(err) return res.send(500, err.message);

		console.log('GET/MovProductoFinal/' + req.params.id);
		res.status(200).jsonp(movProductoUsado);
    };
	
    MovProductoUsado.findById(req.params.id).populate('materiaPrimaUsada').populate('prodSemiUsado').populate('prodTermUsado').exec(findByIdCallback); //luego de realizar la busqueda ejecuta el callback
};


exports.add = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var movProductoUsado = new MovProductoUsado({ //creo un nuevo movProductoFinal en base a lo recibido en el request
        movimientoProduccionFinalID:      req.body.movimientoProduccionFinalID, 
        prodSemiUsado:                req.body._id,
		materiaPrimaUsada:                req.body._id,
		prodTermUsado:                req.body._id,
        cantidadUsada:    req.body.cant,
		tipo:				  req.body.tipo,
    });

    movProductoUsado.save(function(err, movProductoUsado) { //almaceno el movProductoFinal en la base de datos
        if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(movProductoUsado);
    });
};


exports.update = function(req, res) {
	console.log('UPDATE');
    console.log(req.body);
	
    MovProductoUsado.findById(req.params.id, function(err, movProductoUsado) { //"movProductoUsado" es el objeto que me devuelve la busqueda
        
		//actualizo todos los campos de ese "movProductoUsado"
        movProductoUsado.movimientoProduccionFinalID =      req.body.movimientoProduccionFinalID;
        movProductoUsado.materiaPrimaUsada      		 =      req.body.productoUsadoID;
		movProductoUsado.prodSemiUsado      		 =      req.body.productoUsadoID;
		movProductoUsado.prodTermUsado      		 =      req.body.productoUsadoID;
        movProductoUsado.cantidadUsada 				 =  	 req.body.cantidadUsada;
		movProductoUsado.tipo 						 = 		 req.body.tipo;

        movProductoUsado.save(function(err) { //almaceno en la base "movProductoUsado" para que quede actualizada con los nuevos cambios
            if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(movProductoUsado);
        });
    });
};

exports.findByProductoFinal_id = function(req, res) {
	console.log('UPDATE');
    console.log(req.body);
	
    MovProductoUsado.find({'movimientoProduccionFinalID': req.params.id}).populate('materiaPrimaUsada').populate('prodSemiUsado').populate('prodTermUsado').exec(function(err, movsProductosUsados) { //"movProductoFinal" es el objeto que me devuelve la busqueda
        
		if(err) res.send(500, err.message);

		console.log('GET/MovProductoUsado');	
		res.status(200).jsonp(movsProductosUsados);
    });
};

exports.delete = function(req, res) {
	console.log('DELETE');	
	console.log(req.params.id);
	
    MovProductoUsado.findById(req.params.id, function(err, movProductoUsado) {
        movProductoUsado.remove(function(err) {
            if(err) return res.status(500).send(err.message);
			res.status(200).send(movProductoUsado);
        })
    });
};

function actualizar(prodModel, productoU) {
	prodModel.findById(productoU._id, function(err, producto) { //"producto" es el objeto que me devuelve la busqueda
				producto.cantidad = productoU.cantidad;
				producto.save();
			});
};

exports.deleteMany = function(req, res) {
	MovProductoUsado.find({'movimientoProduccionFinalID': req.params.id}).populate('materiaPrimaUsada').populate('prodSemiUsado').populate('prodTermUsado').exec(function(err, movsProductosUsados) { 
	
		for (var i = 0; i < movsProductosUsados.length; i++) {
			var productoU = null;
			var prodModel = null;
			
			if (movsProductosUsados[i].materiaPrimaUsada) {
				productoU = movsProductosUsados[i].materiaPrimaUsada;
				prodModel = MateriaPrima;
			} else if (movsProductosUsados[i].prodSemiUsado) {
				productoU = movsProductosUsados[i].prodSemiUsado;
				prodModel = ProductoSemiProcesado;
			} else {
				productoU = movsProductosUsados[i].prodTermUsado;
				prodModel = ProductoTerminado;
			}
			
			productoU.cantidad = productoU.cantidad + movsProductosUsados[i].cantidadUsada;
			console.log(productoU._id + '  -1- ' + productoU.cantidad);
			actualizar(prodModel, productoU);
			movsProductosUsados[i].remove();
		}
		
		if(err) res.send(500, err.message);

		console.log('GET/deleteMany');	
		res.status(200);
		
    });
};


