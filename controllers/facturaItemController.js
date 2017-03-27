var mongoose = require('mongoose');
//Import models
var FacturaItem  = require("../models/facturaItem").facturaItemModel;

exports.findByFacturaId = function(req, res) {
	var findByIdCallback =
	function(err, facturaItem){
		if(err) return res.send(500, err.message);

		console.log('GET/facturaItems/factura/' + req.params.id);
		res.status(200).jsonp(facturaItem);
    };

    FacturaItem.find({facturaID: req.params.id}, findByIdCallback); //luego de realizar la busqueda ejecuta el callback
};

exports.add = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var facturaItem = new FacturaItem({ //creo un nuevo facturaItem en base a lo recibido en el request
        tipo:    	    req.body.tipo,
        nombre:     	req.body.nombre,
        cantidad:       req.body.cantidad,
        precio:         req.body.precio,
        iva:            req.body.iva,
        facturaID:      req.body.facturaID
    });

    facturaItem.save(function(err, facturaItem) { //almaceno el facturaItem en la base de datos
        if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(facturaItem);
    });
};
