var mongoose = require('mongoose');
//Import models
var ListaPrecio  = require("../models/listaDePrecios").listaDePreciosModel;

exports.findAll = function(req, res) {
    console.log('GET/listaPrecios'); 
    ListaPrecio.find({}).populate('mp_ID').populate('sp_ID').populate('pt_ID').exec(function(err, listaPrecios){ 
        if(err) res.send(500, err.message);
        res.status(200).jsonp(listaPrecios);
    });
};


exports.findById = function(req, res) {  
	var findByIdCallback = 
	function(err, listaPrecio){
		if(err) return res.send(500, err.message);

		console.log('GET/listaPrecio/' + req.params.id);
		res.status(200).jsonp(listaPrecio);
    };
	
    ListaPrecio.findById(req.params.id, findByIdCallback); //luego de realizar la busqueda ejecuta el callback
};


exports.add = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var listaPrecio = new ListaPrecio({ //creo un nuevo listaPrecio en base a lo recibido en el request
        nombre:    	req.body.nombre,
        mp_ID:     	req.body.mp_ID,
        sp_ID:      req.body.sp_ID,
        pt_ID:   	req.body.pt_ID,
        precio:  	req.body.precio,
    });

    listaPrecio.save(function(err, listaPrecio) { //almaceno el listaPrecio en la base de datos
        if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(listaPrecio);
    });
};


exports.update = function(req, res) {
	console.log('UPDATE');
    console.log(req.body);
	
    ListaPrecio.findById(req.params.id, function(err, listaPrecio) { //"listaPrecio" es el objeto que me devuelve la busqueda
        
		//actualizo todos los campos de ese "listaPrecio"
        listaPrecio.nombre =   	req.body.nombre;
        listaPrecio.mp_ID =     		  	req.body.mp_ID;
        listaPrecio.sp_ID=    req.body.sp_ID;
        listaPrecio.pt_ID =   	req.body.pt_ID;
        listaPrecio.precio =  		req.body.precio;

        listaPrecio.save(function(err) { //almaceno en la base "listaPrecio" para que quede actualizada con los nuevos cambios
            if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(listaPrecio);
        });
    });
};


exports.delete = function(req, res) {
	console.log('DELETE');	
	console.log(req.params.id);
	
    ListaPrecio.findById(req.params.id, function(err, listaPrecio) {
        listaPrecio.remove(function(err) {
            if(err) return res.status(500).send(err.message);
			res.status(200).send(listaPrecio);
        })
    });
};

exports.findByName = function(req, res) {
    console.log('GET/listaPrecio/list' + req.params.name);

    var findByNameCallback = 
    function(err, listaPrecios){
        if(err) return res.send(500, err.message);

        res.status(200).jsonp(listaPrecios);
    };

    ListaPrecio.find({nombre: req.params.name}, findByNameCallback);
}

exports.updateListName = function(req, res) {
    console.log('UPDATE LIST NAME');
    console.log(req.body);
    
    ListaPrecio.find({nombre: req.params.name}, function(err, listaPrecios) { //"listaPrecio" es el objeto que me devuelve la busqueda
        
        for (var i = 0; i < listaPrecios.length; i++) {
            listaPrecios[i].nombre = req.body.nombre;
            listaPrecios[i].save(function(err) { //almaceno en la base "listaPrecio" para que quede actualizada con los nuevos cambios
                if(err) return res.status(500).send(err.message);
            });
        };

        return res.status(200).jsonp(listaPrecios);
    });
};

exports.deleteList = function(req, res) {
    console.log('DELETE/listaPrecio/' + req.params.name); 
    
    var deleteListCallback = 
    function(err, listaPrecios){
        for (var i = 0; i < listaPrecios.length; i++) {
            listaPrecios[i].remove(function(err) {
                if(err) return res.status(500).send(err.message);
            })
        };

        return res.status(200).jsonp(listaPrecios);
    };
    
    ListaPrecio.find({nombre: req.params.name}, deleteListCallback)
};


