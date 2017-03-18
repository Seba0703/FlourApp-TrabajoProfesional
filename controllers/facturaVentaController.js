var mongoose = require('mongoose');
//Import models
var facturaVenta  = require("../models/facturaVenta").facturaVentaModel;

exports.findAll = function(req, res) {
    facturaVenta.find(function(err, facturaVentas){
		if(err) res.send(500, err.message);

		console.log('GET/facturaVentas');
		res.status(200).jsonp(facturaVentas);
		});
};


exports.findById = function(req, res) {
	var findByIdCallback =
	function(err, facturaVenta){
		if(err) return res.send(500, err.message);

		console.log('GET/facturaVenta/' + req.params.id);
		res.status(200).jsonp(facturaVenta);
    };

    facturaVenta.findById(req.params.id, findByIdCallback); //luego de realizar la busqueda ejecuta el callback
};


exports.add = function(req, res) {
    console.log('POST');
    console.log(req.body);

};


exports.update = function(req, res) {
	console.log('UPDATE');
    console.log(req.body);

    facturaVenta.findById(req.params.id, function(err, facturaVenta) { //"facturaVenta" es el objeto que me devuelve la busqueda

		//actualizo todos los campos de ese "facturaVenta"
        facturaVenta.nombreEmpresa =   	req.body.nombreEmpresa;
        facturaVenta.cuit =     		  	req.body.cuit;
        facturaVenta.categoriaFiscal=    req.body.categoriaFiscal;
        facturaVenta.listaPrecioNombre =   	req.body.listaPrecioNombre;
        facturaVenta.direccion =  		req.body.direccion;
        facturaVenta.condicionPago =   req.body.condicionPago;

        facturaVenta.save(function(err) { //almaceno en la base "facturaVenta" para que quede actualizada con los nuevos cambios
            if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(facturaVenta);
        });
    });
};


exports.delete = function(req, res) {
	console.log('DELETE');
	console.log(req.params.id);

    facturaVenta.findById(req.params.id, function(err, facturaVenta) {
        facturaVenta.remove(function(err) {
            if(err) return res.status(500).send(err.message);
			res.status(200).send(facturaVenta);
        })
    });
};
