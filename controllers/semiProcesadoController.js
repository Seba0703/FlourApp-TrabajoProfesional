var mongoose = require('mongoose');
//Import models
var ProductoSemiProcesado  = require("../models/productoSemiProcesado").productoSemiProcesadoModel;

exports.findAll = function(req, res) {
    ProductoSemiProcesado.find(function(err, semiProcesados){
		if(err) res.send(500, err.message);

		console.log('GET/semiProcesados');
		res.status(200).jsonp(semiProcesados);
		});
};


exports.findById = function(req, res) {
	var findByIdCallback =
	function(err, semiProcesado){
		if(err) return res.send(500, err.message);

		console.log('GET/semiProcesado/' + req.params.id);
		res.status(200).jsonp(semiProcesado);
    };

    ProductoSemiProcesado.findById(req.params.id, findByIdCallback); //luego de realizar la busqueda ejecuta el callback
};


exports.add = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var semiProcesado = new ProductoSemiProcesado({ //creo un nuevo semiProcesado en base a lo recibido en el request
        tasaImpositivaID:      req.body.tasaImpositivaID,
        nombre:                req.body.nombre,
        cantidad:    	       req.body.cantidad,
        unidad:     	       req.body.unidad,
        stockMin:              req.body.stockMin,
        stockMax:   	       req.body.stockMax,
        stockOptimo:   	        (req.body.stockMax+req.body.stockMin)/2,
        embolsadoCantDefault:  req.body.embolsadoCantDefault,
        porcentajeMerma:       req.body.porcentajeMerma,
        tipo:                  req.body.tipo,
        listaPorcentajesID:    req.body.listaPorcentajesID,
        precioVenta:  	       req.body.precioVenta

    });

    semiProcesado.save(function(err, semiProcesado) { //almaceno el semiProcesado en la base de datos
        if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(semiProcesado);
    });
};

exports.canUpdateStock = function(req, res) {
	console.log('CAN UPDATE STOCK');
	console.log(req.query);
	ProductoSemiProcesado.findById(req.query.id, function(err, semiProcesado) {
		if (semiProcesado) {
			if (semiProcesado.cantidad || +req.query.add == 1) {
				console.log(semiProcesado.cantidad);
				if (+req.query.add == 1){
					console.log('SUMA');
					if (semiProcesado.cantidad)
						semiProcesado.cantidad = +semiProcesado.cantidad + +req.query.cant;
					else
						semiProcesado.cantidad = +req.query.cant;
				} else {
					console.log('resta');
					semiProcesado.cantidad = +semiProcesado.cantidad - +req.query.cant;
				}

				console.log(semiProcesado.cantidad);

				if(semiProcesado.cantidad >= 0) {
					res.status(200).jsonp(semiProcesado);
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

    ProductoSemiProcesado.findById(req.params.id, function(err, semiProcesado) { //"semiProcesado" es el objeto que me devuelve la busqueda

		//actualizo todos los campos de ese "semiProcesado"
        semiProcesado.tasaImpositivaID =     req.body.tasaImpositivaID;
        semiProcesado.nombre =               req.body.nombre;
        semiProcesado.cantidad =   	         req.body.cantidad;
        semiProcesado.unidad =     		  	 req.body.unidad;
        semiProcesado.stockMin =             req.body.stockMin;
        semiProcesado.stockMax =   	         req.body.stockMax;
        semiProcesado.stockOptimo =   	        (req.body.stockMax+req.body.stockMin)/2;
        semiProcesado.embolsadoCantDefault = req.body.embolsadoCantDefault;
        semiProcesado.porcentajeMerma =      req.body.porcentajeMerma;
        semiProcesado.tipo =                 req.body.tipo;
        semiProcesado.listaPorcentajesID =   req.body.listaPorcentajesID;
        semiProcesado.precioVenta =          req.body.precioVenta;

        semiProcesado.save(function(err) { //almaceno en la base "semiProcesado" para que quede actualizada con los nuevos cambios
            if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(semiProcesado);
        });
    });
};

exports.updateStock = function(req, res) {
	console.log('UPDATE STOCK');
    console.log(req.body);
	ProductoSemiProcesado.findById(req.body._id, function(err, semiProcesado) {
		if (semiProcesado) {
			if (semiProcesado.cantidad || +req.body.add == 1) {
				if (+req.body.add == 1){
					if (semiProcesado.cantidad)
						semiProcesado.cantidad = +semiProcesado.cantidad + +req.body.cant;
					else
						semiProcesado.cantidad = +req.body.cant;
				} else {
					semiProcesado.cantidad = +semiProcesado.cantidad - +req.body.cant;
				}

				if(semiProcesado.cantidad >= 0) {
					semiProcesado.save(function(err) { //almaceno en la base "semiProcesado" para que quede actualizada con los nuevos cambios
						if(err) return res.status(500).send(err.message);
						res.status(200).jsonp(semiProcesado);
					});
				} else {
					res.status(505).send('No hay stock suficiente para realizar la accion. ' + req.body._id);
				}
			} else {
				res.status(504).send('No una cantidad ingresada para ' + req.body._id + req.body.add);
			}
		} else {
			res.status(503).send('Pruducto no encontrado en Semi Procesados. ' + req.body._id);
		}
	});
}


exports.delete = function(req, res) {
	console.log('DELETE');
	console.log(req.params.id);

    ProductoSemiProcesado.findById(req.params.id, function(err, semiProcesado) {
        semiProcesado.remove(function(err) {
            if(err) return res.status(500).send(err.message);
			res.status(200).send(semiProcesado);
        })
    });
};
