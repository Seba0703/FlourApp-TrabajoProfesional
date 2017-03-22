var mongoose = require('mongoose');
//Import models
var FacturaItem  = require("../models/facturaItem").facturaItemModel;

exports.findAll = function(req, res) { 
    console.log('GET/facturaItems/')
    FacturaItem.find(function(err, facturaItems){
        if(err) res.send(500, err.message);

        res.status(200).jsonp(facturaItems);
        });
};

exports.findById = function(req, res) {
	var findByIdCallback =
	function(err, facturaItem){
		if(err) return res.send(500, err.message);

		console.log('GET/facturaItem/' + req.params.facturaID);
		res.status(200).jsonp(facturaItem);
    };

    FacturaItem.findById(req.params.id, findByIdCallback); //luego de realizar la busqueda ejecuta el callback
};

exports.add = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var facturaItem = new FacturaItem({ //creo un nuevo facturaItem en base a lo recibido en el request
        tipo:    	      req.body.tipo,
        nombre:     		req.body.nombre,
        cantidad:       req.body.cantidad,
        facturaID:  req.body.facturaID
    });

    facturaItem.save(function(err, facturaItem) { //almaceno el facturaItem en la base de datos
        if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(facturaItem);
    });
};

exports.update = function(req, res) {
    console.log('UPDATE');

    FacturaItem.findById(req.params.id, function(err, facturaItem) { //"facturaItem" es el objeto que me devuelve la busqueda

        //actualizo todos los campos de ese "facturaItem"
        facturaItem.tipo =              req.body.tipo;
        facturaItem.nombre =            req.body.nombre;
        facturaItem.cantidad =          req.body.cantidad;
        facturaItem.facturaID =    req.body.facturaID;

        facturaItem.save(function(err) { //almaceno en la base "facturaItem" para que quede actualizada con los nuevos cambios
            if(err) return res.status(500).send(err.message);
            res.status(200).jsonp(facturaItem);
        });
    });
};


exports.delete = function(req, res) {
    console.log('DELETE');  

    FacturaItem.findById(req.params.id, function(err, facturaItem) {
        facturaItem.remove(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).send(facturaItem);
        })
    });
};
