var mongoose = require('mongoose');
//Import models
var Usuario  = require("../models/usuario").usuarioModel;

exports.findAll = function(req, res) {  
    Usuario.find(function(err, usuarios){ 
		if(err) res.send(500, err.message);

		console.log('GET/usuarios');
		res.status(200).jsonp(usuarios);
		});
};


exports.findById = function(req, res) {  
	var findByIdCallback = 
	function(err, usuario){
		if(err) return res.send(500, err.message);

		console.log('GET/usuario/' + req.params.id);
		res.status(200).jsonp(usuario);
    };
	
    Usuario.findById(req.params.id, findByIdCallback); //luego de realizar la busqueda ejecuta el callback
};


exports.add = function(req, res) {  
    console.log('POST');
    console.log(req.body);

    var usuario = new Usuario({ //creo un nuevo usuario en base a lo recibido en el request
        contrasenia:    	req.body.contrasenia,
        permisos:     		req.body.permisos,
        nombre:             req.body.nombre
    });

    usuario.save(function(err, usuario) { //almaceno el usuario en la base de datos
        if(err) return res.status(500).send( err.message);
		res.status(200).jsonp(usuario);
    });
};


exports.update = function(req, res) {
	console.log('UPDATE');
    console.log(req.body);
	
    Usuario.findById(req.params.id, function(err, usuario) { //"usuario" es el objeto que me devuelve la busqueda
        
		//actualizo todos los campos de ese "usuario"
        usuario.contrasenia =   	req.body.contrasenia;
        usuario.permisos =     		req.body.permisos;
        usuario.nombre =            req.body.nombre;

        usuario.save(function(err) { //almaceno en la base "usuario" para que quede actualizada con los nuevos cambios
            if(err) return res.status(500).send(err.message);
			res.status(200).jsonp(usuario);
        });
    });
};


exports.delete = function(req, res) {
	console.log('DELETE');	
	console.log(req.params.id);
	
    Usuario.findById(req.params.id, function(err, usuario) {
        usuario.remove(function(err) {
            if(err) return res.status(500).send(err.message);
			res.status(200).send(usuario);
        })
    });
};


