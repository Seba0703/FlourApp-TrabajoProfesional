var mongoose = require('mongoose');
//Import models
var ProductoTerminado  = require("../models/productoTerminado").productoTerminadoModel;

exports.findAll = function(req, res) {  
    ProductoTerminado.find(function(err, productosTerminados){ 
		if(err) res.send(500, err.message);

		console.log('GET/productosTerminados');
		res.status(200).jsonp(productosTerminados);
		});
};


exports.findById = function(req, res) {  
	var findByIdCallback = 
	function(err, productoTerminado){
		if(err) return res.send(500, err.message);

		console.log('GET/productoTerminado/' + req.params.id);
		res.status(200).jsonp(productoTerminado);
    };
	
    ProductoTerminado.findById(req.params.id, findByIdCallback); //luego de realizar la busqueda ejecuta el callback
};


exports.add = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var productoTerminado = new ProductoTerminado({ //creo un nuevo productoTerminado en base a lo recibido en el request
        tasaImpositivaID:      req.body.tasaImpositivaID, 
        nombre:                req.body.nombre,
        cantidad:    	       req.body.cantidad,
        unidad:     	       req.body.unidad,
        stockMin:              req.body.stockMin,
        stockMax:   	       req.body.stockMax,
        embolsadoCantDefault:  req.body.embolsadoCantDefault,
        porcentajeMerma:       req.body.porcentajeMerma,
        tipo:                  req.body.tipo,
        precioVenta:  	       req.body.precioVenta

    });

    productoTerminado.save(function(err, productoTerminado) { //almaceno el productoTerminado en la base de datos
        if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(productoTerminado);
    });
};

exports.canUpdateStock = function(req, res) {
	console.log('CAN UPDATE STOCK');
	console.log(req.query);
	ProductoTerminado.findById(req.query.id, function(err, productoTerminado) {
		if (productoTerminado) {
			if (productoTerminado.cantidad || +req.query.add == 1) {
				if (+req.query.add == 1){
					if (productoTerminado.cantidad)
						productoTerminado.cantidad = +productoTerminado.cantidad + +req.query.cant;
					else 
						productoTerminado.cantidad = +req.query.cant;
				} else {
					productoTerminado.cantidad = +productoTerminado.cantidad - +req.query.cant;
				}
				
				if(productoTerminado.cantidad >= 0) { 
					res.status(200).jsonp(productoTerminado);
				} else {
					res.status(505).send('No hay stock suficiente para realizar la accion. ' + req.query.id);
				}
			} else {
				res.status(504).send('No una cantidad ingresada para ' + req.query.id);
			}
		} else {
			res.status(503).send('Pruducto no encontrado en Materia Prima. ' + req.query.id);
		}
	});
}


exports.update = function(req, res) {
	console.log('UPDATE');
    console.log(req.body);
	
    ProductoTerminado.findById(req.params.id, function(err, productoTerminado) { //"productoTerminado" es el objeto que me devuelve la busqueda
        
		//actualizo todos los campos de ese "productoTerminado"
        productoTerminado.tasaImpositivaID =     req.body.tasaImpositivaID;
        productoTerminado.nombre =               req.body.nombre;
        productoTerminado.cantidad =   	         req.body.cantidad;
        productoTerminado.unidad =     		  	 req.body.unidad;
        productoTerminado.stockMin =             req.body.stockMin;
        productoTerminado.stockMax =   	         req.body.stockMax;
        productoTerminado.embolsadoCantDefault = req.body.embolsadoCantDefault;
        productoTerminado.porcentajeMerma =      req.body.porcentajeMerma;
        productoTerminado.tipo =                 req.body.tipo;
        productoTerminado.precioVenta =          req.body.precioVenta;

        productoTerminado.save(function(err) { //almaceno en la base "productoTerminado" para que quede actualizada con los nuevos cambios
            if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(productoTerminado);
        });
    });
};

exports.updateStock = function(req, res) {
	console.log('UPDATE STOCK');
    console.log(req.body);
	ProductoTerminado.findById(req.body._id, function(err, productoTerminado) {
		if (productoTerminado) {
			if (productoTerminado.cantidad || +req.body.add == 1) {
				if (+req.body.add == 1){
					if (productoTerminado.cantidad)
						productoTerminado.cantidad = +productoTerminado.cantidad + +req.body.cant;
					else 
						productoTerminado.cantidad = +req.body.cant;
				} else {
					productoTerminado.cantidad = +productoTerminado.cantidad - +req.body.cant;
				}
				
				if( productoTerminado.cantidad >= 0) { 
					productoTerminado.save(function(err) { //almaceno en la base "productoTerminado" para que quede actualizada con los nuevos cambios
						if(err) return res.status(500).send(err.message);
						res.status(200).jsonp(productoTerminado);
					});
				} else {
					res.status(505).send('No hay stock suficiente para realizar la accion. ' + req.body._id);
				}
			} else {
				res.status(504).send('No hay una cantidad ingresada para ' + req.body._id);
			}
		} else {
			res.status(503).send('Pruducto no encontrado en Terminados. ' + req.body._id);
		}
	});
}


exports.delete = function(req, res) {
	console.log('DELETE');	
	console.log(req.params.id);
	
    ProductoTerminado.findById(req.params.id, function(err, productoTerminado) {
        productoTerminado.remove(function(err) {
            if(err) return res.status(500).send(err.message);
			res.status(200).send(productoTerminado);
        })
    });
};


