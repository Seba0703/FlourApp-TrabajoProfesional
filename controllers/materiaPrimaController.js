var mongoose = require('mongoose');
//Import models
var MateriaPrima  = require("../models/materiaPrima").materiaPrimaModel;

exports.findAll = function(req, res) {  
    MateriaPrima.find(function(err, materiasPrima){ 
		if(err) res.send(500, err.message);

		console.log('GET/materiasPrima');
		res.status(200).jsonp(materiasPrima);
		});
};


exports.findById = function(req, res) {  
	var findByIdCallback = 
	function(err, materiaPrima){
		if(err) return res.send(500, err.message);

		console.log('GET/materiaPrima/' + req.params.id);
		res.status(200).jsonp(materiaPrima);
    };
	
    MateriaPrima.findById(req.params.id, findByIdCallback); //luego de realizar la busqueda ejecuta el callback
};


exports.add = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var materiaPrima = new MateriaPrima({ //creo un nuevo materiaPrima en base a lo recibido en el request
        tasaImpositivaID:       req.body.tasaImpositivaID,
        nombre:                 req.body.nombre,
        cantidad:    	        req.body.cantidad,
        unidad:     	        req.body.unidad,
        stockMin:               req.body.stockMin,
        stockMax:   	        req.body.stockMax,
        embolsadoCantDefault:   req.body.embolsadoCantDefault,
        precioVenta:  	        req.body.precioVenta,
        tipo:                   req.body.tipo,
    });

    materiaPrima.save(function(err, materiaPrima) { //almaceno el materiaPrima en la base de datos
        if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(materiaPrima);
    });
};


exports.update = function(req, res) {
	console.log('UPDATE');
    console.log(req.body);
	
    MateriaPrima.findById(req.params.id, function(err, materiaPrima) { //"materiaPrima" es el objeto que me devuelve la busqueda
        
		//actualizo todos los campos de ese "materiaPrima"
        materiaPrima.tasaImpositivaID =     req.body.tasaImpositivaID;
        materiaPrima.nombre =               req.body.nombre;
        materiaPrima.cantidad =   	        req.body.cantidad;
        materiaPrima.unidad =     		  	req.body.unidad;
        materiaPrima.stockMin =             req.body.stockMin;
        materiaPrima.stockMax =   	        req.body.stockMax;
        materiaPrima.embolsadoCantDefault = req.body.embolsadoCantDefault;
        materiaPrima.precioVenta =  		req.body.precioVenta;
        materiaPrima.tipo =                 req.body.tipo;

        materiaPrima.save(function(err) { //almaceno en la base "materiaPrima" para que quede actualizada con los nuevos cambios
            if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(materiaPrima);
        });
    });
};


exports.delete = function(req, res) {
	console.log('DELETE');	
	console.log(req.params.id);
	
    MateriaPrima.findById(req.params.id, function(err, materiaPrima) {
        materiaPrima.remove(function(err) {
            if(err) return res.status(500).send(err.message);
			res.status(200).send(materiaPrima);
        })
    });
};


