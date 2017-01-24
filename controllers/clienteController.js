var mongoose = require('mongoose');
//Import models
var Cliente  = require("../models/cliente").clienteModel;

exports.findAll = function(req, res) {  
    Cliente.find(function(err, clientes){ 
		if(err) res.send(500, err.message);

		console.log('GET/clientes');
		res.status(200).jsonp(clientes);
		});
};


exports.findById = function(req, res) {  
	var findByIdCallback = 
	function(err, cliente){
		if(err) return res.send(500, err.message);

		console.log('GET/cliente/' + req.params.id);
		res.status(200).jsonp(cliente);
    };
	
    Cliente.findById(req.params.id, findByIdCallback); //luego de realizar la busqueda ejecuta el callback
};


exports.add = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var cliente = new Cliente({ //creo un nuevo cliente en base a lo recibido en el request
        nombreEmpresa:    	req.body.nombreEmpresa,
        cuit:     		  	req.body.cuit,
        categoriaFiscal:    req.body.categoriaFiscal,
        listaPrecioID:   	req.body.listaPrecioID,
        direccion:  		req.body.direccion,
        condicionPagoID:    req.body.condicionPagoID
    });

    cliente.save(function(err, cliente) { //almaceno el cliente en la base de datos
        if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(cliente);
    });
};


exports.update = function(req, res) {
	console.log('UPDATE');
    console.log(req.body);
	
    Cliente.findById(req.params.id, function(err, cliente) { //"cliente" es el objeto que me devuelve la busqueda
        
		//actualizo todos los campos de ese "cliente"
        cliente.nombreEmpresa =   	req.body.nombreEmpresa;
        cliente.cuit =     		  	req.body.cuit;
        cliente.categoriaFiscal=    req.body.categoriaFiscal;
        cliente.listaPrecioID =   	req.body.listaPrecioID;
        cliente.direccion =  		req.body.direccion;
        cliente.condicionPagoID =   req.body.condicionPagoID;

        cliente.save(function(err) { //almaceno en la base "cliente" para que quede actualizada con los nuevos cambios
            if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(cliente);
        });
    });
};


exports.delete = function(req, res) {
	console.log('DELETE');	
	console.log(req.params.id);
	
    Cliente.findById(req.params.id, function(err, cliente) {
        cliente.remove(function(err) {
            if(err) return res.status(500).send(err.message);
			res.status(200).send(cliente);
        })
    });
};


