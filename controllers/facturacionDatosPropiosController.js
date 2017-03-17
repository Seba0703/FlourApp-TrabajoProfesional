var mongoose = require('mongoose');
//Import models
var FacturacionDatosPropios  = require("../models/facturacionDatosPropios").facturacionDatosPropiosModel;

exports.findAll = function(req, res) {
    FacturacionDatosPropios.find(function(err, FacturacionDatosPropios){
		if(err) res.send(500, err.message);

		console.log('GET/FacturacionDatosPropios');
		res.status(200).jsonp(FacturacionDatosPropios);
		});
};

exports.add = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var facturacionDatosPropios = new FacturacionDatosPropios({ //creo un nuevo facturacionDatosPropios en base a lo recibido en el request
      razonSocial:	        req.body.razonSocial,
      cuit:   	  		      req.body.cuit,
      domicilioComercial:   req.body.domicilioComercial,
      categoriaFiscal:      req.body.categoriaFiscal,
      ingresosBrutos:       req.body.ingresosBrutos,
      inicioActividades:   	req.body.inicioActividades
    });

    facturacionDatosPropios.save(function(err, facturacionDatosPropios) { //almaceno el facturacionDatosPropios en la base de datos
        if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(facturacionDatosPropios);
    });
};
