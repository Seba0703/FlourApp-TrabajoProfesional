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

exports.update = function(req, res) {
    console.log('UPDATE');
    console.log(req.body);

    FacturaItem.findById(req.params.id, function(err, facturaItem) { //"facturaItem" es el objeto que me devuelve la busqueda

        if (facturaItem != null) { //Es la modificacion de un producto existente
            //actualizo todos los campos de ese "facturaItem"
            facturaItem.tipo =          req.body.tipo;
            facturaItem.nombre =        req.body.nombre;
            facturaItem.cantidad =      req.body.cantidad;
            facturaItem.precio =        req.body.precio;
            facturaItem.iva =           req.body.iva;
            facturaItem.facturaID =     req.body.facturaID;

            facturaItem.save(function(err) { //almaceno en la base "facturaItem" para que quede actualizada con los nuevos cambios
                if(err) return res.status(500).send(err.message);
                res.status(200).jsonp(facturaItem);
            });
        } else { //Es la creacion de un producto cuando es agregado mediante una modificacion
            var facturaItem = new FacturaItem({ //creo un nuevo facturaItem en base a lo recibido en el request
                tipo:           req.body.tipo,
                nombre:         req.body.nombre,
                cantidad:       req.body.cantidad,
                precio:         req.body.precio,
                iva:            req.body.iva,
                facturaID:      req.body.facturaID
            });

            facturaItem.save(function(err, facturaItem) { //almaceno el facturaItem en la base de datos
                if(err) return res.status(500).send( err.message);
                res.status(200).jsonp(facturaItem);
            });
        }
    });
};


exports.delete = function(req, res) {
    console.log('DELETE');
    console.log(req.body);

    FacturaItem.findById(req.params.id, function(err, facturaItem) {
        facturaItem.remove(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).send(facturaItem);
        })
    });
};
