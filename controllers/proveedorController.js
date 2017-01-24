var mongoose = require('mongoose');
//Import models
var Proveedor  = require("../models/proveedor").proveedorModel;

exports.findAll = function(req, res) {  
    Proveedor.find(function(err, proveedores){ 
		if(err) res.send(500, err.message);

		console.log('GET/proveedores');
		res.status(200).jsonp(proveedores);
		});
};


exports.findById = function(req, res) {  
	var findByIdCallback = 
	function(err, proveedor){
		if(err) return res.send(500, err.message);

		console.log('GET/proveedor/' + req.params.id);
		res.status(200).jsonp(proveedor);
    };
	
    Proveedor.findById(req.params.id, findByIdCallback); //luego de realizar la busqueda ejecuta el callback
};


exports.add = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var proveedor = new Proveedor({ //creo un nuevo proveedor en base a lo recibido en el request
        nombreEmpresa:    	req.body.nombreEmpresa,
        cuit:     		  	req.body.cuit,
        categoriaFiscal:    req.body.categoriaFiscal,
        listaPrecioID:   	req.body.listaPrecioID,
        direccion:  		req.body.direccion,
        condicionPagoID:    req.body.condicionPagoID
    });

    proveedor.save(function(err, proveedor) { //almaceno el proveedor en la base de datos
        if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(proveedor);
    });
};


exports.update = function(req, res) {
	console.log('UPDATE');
    console.log(req.body);
	
    Proveedor.findById(req.params.id, function(err, proveedor) { //"proveedor" es el objeto que me devuelve la busqueda
        
		//actualizo todos los campos de ese "proveedor"
        proveedor.nombreEmpresa =   	req.body.nombreEmpresa;
        proveedor.cuit =     		  	req.body.cuit;
        proveedor.categoriaFiscal =  	req.body.categoriaFiscal;
        proveedor.listaPrecioID =   	req.body.listaPrecioID;
        proveedor.direccion =  			req.body.direccion;
        proveedor.condicionPagoID =     req.body.condicionPagoID;

        proveedor.save(function(err) { //almaceno en la base "proveedor" para que quede actualizada con los nuevos cambios
            if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(proveedor);
        });
    });
};


exports.delete = function(req, res) {
	console.log('DELETE');	
	console.log(req.params.id);
	
    Proveedor.findById(req.params.id, function(err, proveedor) {
        proveedor.remove(function(err) {
            if(err) return res.status(500).send(err.message);
			res.status(200).send(proveedor);
        })
    });
};


