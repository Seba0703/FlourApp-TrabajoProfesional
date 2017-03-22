var mongoose = require('mongoose');
//Import models
var FacturaVenta  = require("../models/facturaVenta").facturaVentaModel;

exports.findAll = function(req, res) {
    FacturaVenta.find(function(err, facturasVenta){
		if(err) res.send(500, err.message);

		console.log('GET/facturasVenta');
		res.status(200).jsonp(facturasVenta);
		});
};


exports.findById = function(req, res) {
	var findByIdCallback =
	function(err, facturaVenta){
		if(err) return res.send(500, err.message);

		console.log('GET/facturasVenta/' + req.params.id);
		res.status(200).jsonp(facturaVenta);
    };

    FacturaVenta.findById(req.params.id, findByIdCallback); //luego de realizar la busqueda ejecuta el callback
};


exports.add = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var facturaVenta = new FacturaVenta({ //creo un nuevo facturaVenta en base a lo recibido en el request
        puntoDeVenta:           req.body.puntoDeVenta,
        tipoFactura:            req.body.tipoFactura,
        numeroFactura:          req.body.numeroFactura,
        fechaEmision:           req.body.fechaEmision,
        comprobanteReferencia:  req.body.comprobanteReferencia,
        clienteID:              req.body.clienteID,
        retencionIG:            req.body.retencionIG,
        retencionIVA:           req.body.retencionIVA,
        retencionIB:            req.body.retencionIB,
        impuestosInternos:      req.body.impuestosInternos,
        impuestosMunicipales:   req.body.impuestosMunicipales,
        CAI:                    req.body.CAI,
        fechaVtoCAI:            req.body.fechaVtoCAI
    });

    facturaVenta.save(function(err, facturaVenta) { //almaceno el facturaVenta en la base de datos
        if(err) return res.status(500).send( err.message);
        res.status(200).jsonp(facturaVenta);
    });

};


exports.update = function(req, res) {
	console.log('UPDATE');
    console.log(req.body);

    FacturaVenta.findById(req.params.id, function(err, facturaVenta) { //"facturaVenta" es el objeto que me devuelve la busqueda

		//actualizo todos los campos de ese "facturaVenta"
        facturaVenta.puntoDeVenta =           req.body.puntoDeVenta;
        facturaVenta.tipoFactura =            req.body.tipoFactura;
        facturaVenta.numeroFactura =          req.body.numeroFactura;
        facturaVenta.fechaEmision =           req.body.fechaEmision;
        facturaVenta.comprobanteReferencia =  req.body.comprobanteReferencia;
        facturaVenta.clienteID =              req.body.clienteID;
        facturaVenta.retencionIG =            req.body.retencionIG;
        facturaVenta.retencionIVA =           req.body.retencionIVA;
        facturaVenta.retencionIB =            req.body.retencionIB;
        facturaVenta.impuestosInternos =      req.body.impuestosInternos;
        facturaVenta.impuestosMunicipales =   req.body.impuestosMunicipales;
        facturaVenta.facturaVenta.CAI =       req.body.CAI;
        facturaVenta.fechaVtoCAI =            req.body.fechaVtoCAI;

        facturaVenta.save(function(err) { //almaceno en la base "facturaVenta" para que quede actualizada con los nuevos cambios
            if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(facturaVenta);
        });
    });
};


exports.delete = function(req, res) {
	console.log('DELETE');
	console.log(req.params.id);

    FacturaVenta.findById(req.params.id, function(err, facturaVenta) {
        facturaVenta.remove(function(err) {
            if(err) return res.status(500).send(err.message);
			res.status(200).send(facturaVenta);
        })
    });
};
