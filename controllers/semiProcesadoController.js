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
        cantidad:    	       req.body.cantidad,
        unidad:     	       req.body.unidad,
        stockMin:              req.body.stockMin,
        stockMax:   	       req.body.stockMax,
        embolsadoCantDefault:  req.body.embolsadoCantDefault,
        tipo:                  req.body.tipo,
        listaPorcentajesID:    req.body.listaPorcentajesID,
        precioVenta:  	       req.body.precioVenta

    });

    semiProcesado.save(function(err, semiProcesado) { //almaceno el semiProcesado en la base de datos
        if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(semiProcesado);
    });
};


exports.update = function(req, res) {
	console.log('UPDATE');
    console.log(req.body);
	
    ProductoSemiProcesado.findById(req.params.id, function(err, semiProcesado) { //"semiProcesado" es el objeto que me devuelve la busqueda
        
		//actualizo todos los campos de ese "semiProcesado"
        semiProcesado.tasaImpositivaID =     req.body.tasaImpositivaID;
        semiProcesado.cantidad =   	         req.body.cantidad;
        semiProcesado.unidad =     		  	 req.body.unidad;
        semiProcesado.stockMin =             req.body.stockMin;
        semiProcesado.stockMax =   	         req.body.stockMax;
        semiProcesado.embolsadoCantDefault = req.body.embolsadoCantDefault;
        semiProcesado.tipo =                 req.body.tipo;
        semiProcesado.listaPorcentajesID =   req.body.listaPorcentajesID;
        semiProcesado.precioVenta =          req.body.precioVenta;

        semiProcesado.save(function(err) { //almaceno en la base "semiProcesado" para que quede actualizada con los nuevos cambios
            if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(semiProcesado);
        });
    });
};


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


