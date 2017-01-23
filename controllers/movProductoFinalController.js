var mongoose = require('mongoose');
//Import models
var MovProductoFinal  = require("../models/movimientoProduccionFinal").movimientoProduccionFinalModel;

exports.findAll = function(req, res) {  
    MovProductoFinal.find({}).populate('materiaPrimaUsada').populate('prodSemiUsado').populate('prodTermUsado').exec(function(err, movsProductoFinal){ 
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
	
    MovProductoFinal.findById(req.params.id, findByIdCallback); //luego de realizar la busqueda ejecuta el callback
};


exports.add = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var movProductoFinal = new MovProductoFinal({ //creo un nuevo movProductoFinal en base a lo recibido en el request
        materiaPrimaUsada:      req.body.productoFinalID,
		prodSemiUsado:      req.body.productoFinalID,	
		prodTermUsado:      req.body.productoFinalID,
        fecha:                req.body.fecha,
        cantidadFabricada:    req.body.cantidadFabricada,
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
        movProductoFinal.prodSemiUsado =      req.body.productoFinalID;
		movProductoFinal.prodTermUsado =      req.body.productoFinalID;
		movProductoFinal.materiaPrimaUsada =      req.body.productoFinalID;
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
	
    MovProductoFinal.findById(req.params.id, function(err, movProductoFinal) {
        movProductoFinal.remove(function(err) {
            if(err) return res.status(500).send(err.message);
			res.status(200).send(movProductoFinal);
        })
    });
};


