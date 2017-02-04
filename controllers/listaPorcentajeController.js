var mongoose = require('mongoose');
//Import models
var ListaPorcentaje  = require("../models/listaPorcentajesProduccion").listaPorcentajesProduccionModel;

exports.findAll = function(req, res) {
    console.log('GET/listaPorcentajes'); 
    ListaPorcentaje.find({}, function(err, listaPorcentajes){ 
        if(err) res.send(500, err.message);
        res.status(200).jsonp(listaPorcentajes);
    });
};


exports.findById = function(req, res) {  
	var findByIdCallback = 
	function(err, listaPorcentaje){
		if(err) return res.send(500, err.message);

		console.log('GET/listaPorcentaje/' + req.params.id);
		res.status(200).jsonp(listaPorcentaje);
    };
	
    ListaPorcentaje.findById(req.params.id, findByIdCallback); //luego de realizar la busqueda ejecuta el callback
};

exports.add = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var listaPorcentaje = new ListaPorcentaje({ //creo un nuevo listaPorcentaje en base a lo recibido en el request
        productoAFabricarID:    	req.body.productoAFabricarID,
        productoNecesarioID:     	req.body.productoNecesarioID,
		productoNecesarioIDPrima:	req.body.productoNecesarioID,
		productoNecesarioIDSemi:	req.body.productoNecesarioID,
		productoNecesarioIDTerm:	req.body.productoNecesarioID,
        porcentajeNecesario:        req.body.porcentajeNecesario
    });

    listaPorcentaje.save(function(err, listaPorcentaje) { //almaceno el listaPorcentaje en la base de datos
        if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(listaPorcentaje);
    });

};


exports.update = function(req, res) {
	console.log('UPDATE');
    console.log(req.body);
	
    ListaPorcentaje.findById(req.params.id, function(err, listaPorcentaje) { //"listaPorcentaje" es el objeto que me devuelve la busqueda
        
		//actualizo todos los campos de ese "listaPorcentaje"
        listaPorcentaje.productoAFabricarID 	= req.body.productoAFabricarID;
        listaPorcentaje.productoNecesarioID 	= req.body.productoNecesarioID;
		listaPorcentaje.productoNecesarioIDPrima= req.body.productoNecesarioID;
		listaPorcentaje.productoNecesarioIDSemi = req.body.productoNecesarioID;
		listaPorcentaje.productoNecesarioIDTerm = req.body.productoNecesarioID;
        listaPorcentaje.porcentajeNecesario 	= req.body.porcentajeNecesario;

        listaPorcentaje.save(function(err) { //almaceno en la base "listaPorcentaje" para que quede actualizada con los nuevos cambios
            if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(listaPorcentaje);
        });
    });
};


exports.delete = function(req, res) {
	console.log('DELETE');	
	console.log(req.params.id);
	
  	ListaPorcentaje.findById(req.params.id, function(err, listaPorcentaje) {
        listaPorcentaje.remove(function(err) {
            if(err) return res.status(500).send(err.message);
			res.status(200).send(listaPorcentaje);
        })
    });

/*	ListaPorcentaje.find({listaPorcentajesID: req.params.id}, function(err, listaProdNecesarios) {
        for (var i = 0; i < listaProdNecesarios.length; i++) {
            listaProdNecesarios[i].remove(function(err) {
                if(err) return res.status(500).send(err.message);
            })
        };

        return res.status(200).jsonp(listaProdNecesarios);
    });*/
};


exports.findByProductoAfabricarID = function(req, res) {
    console.log('GET PRODUCTO A FABRICAR ID= ' + req.params.productoAfabricarID);
    console.log(req.body);
    
    ListaPorcentaje.find({productoAFabricarID: req.params.productoAfabricarID}, function(err, listaPorcentajes) { //"listaPorcentaje" es el objeto que me devuelve la busqueda
        
/*        for (var i = 0; i < listaPorcentajes.length; i++) {
            listaPorcentajes[i].productoAFabricarID = req.body.productoAFabricarID;
            listaPorcentajes[i].save(function(err) { //almaceno en la base "listaPorcentaje" para que quede actualizada con los nuevos cambios
                if(err) return res.status(500).send(err.message);
            });
        };*/
        if(err) return res.status(500).send(err.message);

        return res.status(200).jsonp(listaPorcentajes);
    });
};

exports.findByProductoAfabricarIDconDatos = function(req, res) {
    console.log('GET PRODUCTO A FABRICAR ID con datos= ' + req.params.productoAfabricarID);
    console.log(req.body);
    
    ListaPorcentaje.find({productoAFabricarID: req.params.productoAfabricarID, tipo: req.params.tipo})
		.populate('productoNecesarioIDPrima')
		.populate('productoNecesarioIDSemi')
		.populate('productoNecesarioIDTerm')
		.exec(function(err, listaPorcentajes){ //"listaPorcentaje" es el objeto que me devuelve la busqueda
        
/*        for (var i = 0; i < listaPorcentajes.length; i++) {
            listaPorcentajes[i].productoAFabricarID = req.body.productoAFabricarID;
            listaPorcentajes[i].save(function(err) { //almaceno en la base "listaPorcentaje" para que quede actualizada con los nuevos cambios
                if(err) return res.status(500).send(err.message);
            });
        };*/
        if(err) return res.status(500).send(err.message);

        return res.status(200).jsonp(listaPorcentajes);
    });
};

exports.deleteList = function(req, res) {
    console.log('DELETE/listaPorcentaje/PRODUCTO_A_FABRICAR_ID= ' + req.params.productoAfabricarID); 
    
    var deleteListCallback = 
    function(err, listaPorcentajes){
        for (var i = 0; i < listaPorcentajes.length; i++) {
            listaPorcentajes[i].remove(function(err) {
                if(err) return res.status(500).send(err.message);
            })
        };

        return res.status(200).jsonp(listaPorcentajes);
    };
    
    ListaPorcentaje.find({productoAFabricarID: req.params.productoAfabricarID}, deleteListCallback)
};


