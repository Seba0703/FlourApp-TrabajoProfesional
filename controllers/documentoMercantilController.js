var mongoose = require('mongoose');
//Import models
var DocumentoMercantil  = require("../models/documentoMercantil").documentoMercantilModel;

exports.findAll = function(req, res) {
    DocumentoMercantil.find(function(err, documentosmercantiles){
		if(err) res.send(500, err.message);

		console.log('GET/documentosMercantiles');
		res.status(200).jsonp(documentosmercantiles);
		});
};


exports.findById = function(req, res) {
	var findByIdCallback =
	function(err, documentomercantil){
		if(err) return res.send(500, err.message);

		console.log('GET/documentosmercantiles/' + req.params.id);
		res.status(200).jsonp(documentomercantil);
    };

    DocumentoMercantil.findById(req.params.id, findByIdCallback); //luego de realizar la busqueda ejecuta el callback
};

exports.findByTipo = function(req, res) {
    var findByTipoCallback =
    function(err, documentosmercantiles){
        if(err) return res.send(500, err.message);

        console.log('GET/documentosmercantiles/' + req.params.tipo);
        res.status(200).jsonp(documentosmercantiles);
    };

    DocumentoMercantil.find({tipo: req.params.tipo}, findByTipoCallback); //luego de realizar la busqueda ejecuta el callback
};


exports.add = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var documentomercantil = new DocumentoMercantil({ //creo un nuevo documentomercantil en base a lo recibido en el request
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

    documentomercantil.save(function(err, documentomercantil) { //almaceno el documentomercantil en la base de datos
        if(err) return res.status(500).send( err.message);
        res.status(200).jsonp(documentomercantil);
    });

};


exports.update = function(req, res) {
	console.log('UPDATE');
    console.log(req.body);

    DocumentoMercantil.findById(req.params.id, function(err, documentomercantil) { //"documentomercantil" es el objeto que me devuelve la busqueda

		//actualizo todos los campos de ese "documentomercantil"
        documentomercantil.tipo =                   req.body.tipo;
        documentomercantil.puntoDeVenta =           req.body.puntoDeVenta;
        documentomercantil.tipoFactura =            req.body.tipoFactura;
        documentomercantil.numeroFactura =          req.body.numeroFactura;
        documentomercantil.fechaEmision =           req.body.fechaEmision;
        documentomercantil.comprobanteReferencia =  req.body.comprobanteReferencia;
        documentomercantil.empresaID =              req.body.empresaID;
        documentomercantil.condicionPago =          req.body.condicionPago;
        documentomercantil.listaPrecioNombre =      req.body.listaPrecioNombre;
        documentomercantil.retencionIG =            req.body.retencionIG;
        documentomercantil.retencionIVA =           req.body.retencionIVA;
        documentomercantil.retencionIB =            req.body.retencionIB;
        documentomercantil.impuestosInternos =      req.body.impuestosInternos;
        documentomercantil.impuestosMunicipales =   req.body.impuestosMunicipales;
        documentomercantil.CAI =                    req.body.CAI;
        documentomercantil.fechaVtoCAI =            req.body.fechaVtoCAI;

        documentomercantil.save(function(err) { //almaceno en la base "documentomercantil" para que quede actualizada con los nuevos cambios
            if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(documentomercantil);
        });
    });
};


exports.delete = function(req, res) {
	console.log('DELETE');
	console.log(req.params.id);

    DocumentoMercantil.findById(req.params.id, function(err, documentomercantil) {
        documentomercantil.remove(function(err) {
            if(err) return res.status(500).send(err.message);
			res.status(200).send(documentomercantil);
        })
    });
};
