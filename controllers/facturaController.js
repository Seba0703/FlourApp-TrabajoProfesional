var mongoose = require('mongoose');
//Import models
var Factura  = require("../models/factura").facturaModel;

exports.findAll = function(req, res) {
    Factura.find(function(err, facturas){
		if(err) res.send(500, err.message);

		console.log('GET/facturas');
		res.status(200).jsonp(facturas);
		});
};


exports.findById = function(req, res) {
	var findByIdCallback =
	function(err, factura){
		if(err) return res.send(500, err.message);

		console.log('GET/facturas/' + req.params.id);
		res.status(200).jsonp(factura);
    };

    Factura.findById(req.params.id, findByIdCallback); //luego de realizar la busqueda ejecuta el callback
};

exports.findByTipo = function(req, res) {
    var findByTipoCallback =
    function(err, facturas){
        if(err) return res.send(500, err.message);

        console.log('GET/facturas/' + req.params.tipo);
        res.status(200).jsonp(facturas);
    };

    Factura.find({tipo: req.params.tipo}, findByTipoCallback); //luego de realizar la busqueda ejecuta el callback
};


exports.add = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var factura = new Factura({ //creo un nuevo factura en base a lo recibido en el request
        tipo:                   req.body.tipo,
        puntoDeVenta:           req.body.puntoDeVenta,
        tipoFactura:            req.body.tipoFactura,
        numeroFactura:          req.body.numeroFactura,
        fechaEmision:           req.body.fechaEmision,
        comprobanteReferencia:  req.body.comprobanteReferencia,
        empresaID:              req.body.empresaID,
        condicionPago:          req.body.condicionPago,
        listaPrecioNombre:      req.body.listaPrecioNombre,
        retencionIG:            req.body.retencionIG,
        retencionIVA:           req.body.retencionIVA,
        retencionIB:            req.body.retencionIB,
        impuestosInternos:      req.body.impuestosInternos,
        impuestosMunicipales:   req.body.impuestosMunicipales,
        CAI:                    req.body.CAI,
        fechaVtoCAI:            req.body.fechaVtoCAI
    });

    factura.save(function(err, factura) { //almaceno el factura en la base de datos
        if(err) return res.status(500).send( err.message);
        res.status(200).jsonp(factura);
    });

};


exports.update = function(req, res) {
	console.log('UPDATE');
    console.log(req.body);

    Factura.findById(req.params.id, function(err, factura) { //"factura" es el objeto que me devuelve la busqueda

		//actualizo todos los campos de ese "factura"
        factura.tipo =                   req.body.tipo;
        factura.puntoDeVenta =           req.body.puntoDeVenta;
        factura.tipoFactura =            req.body.tipoFactura;
        factura.numeroFactura =          req.body.numeroFactura;
        factura.fechaEmision =           req.body.fechaEmision;
        factura.comprobanteReferencia =  req.body.comprobanteReferencia;
        factura.empresaID =              req.body.empresaID;
        factura.condicionPago =          req.body.condicionPago;
        factura.listaPrecioNombre =      req.body.listaPrecioNombre;
        factura.retencionIG =            req.body.retencionIG;
        factura.retencionIVA =           req.body.retencionIVA;
        factura.retencionIB =            req.body.retencionIB;
        factura.impuestosInternos =      req.body.impuestosInternos;
        factura.impuestosMunicipales =   req.body.impuestosMunicipales;
        factura.CAI =                    req.body.CAI;
        factura.fechaVtoCAI =            req.body.fechaVtoCAI;

        factura.save(function(err) { //almaceno en la base "factura" para que quede actualizada con los nuevos cambios
            if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(factura);
        });
    });
};


exports.delete = function(req, res) {
	console.log('DELETE');
	console.log(req.params.id);

    Factura.findById(req.params.id, function(err, factura) {
        factura.remove(function(err) {
            if(err) return res.status(500).send(err.message);
			res.status(200).send(factura);
        })
    });
};
