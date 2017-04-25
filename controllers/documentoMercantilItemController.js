var mongoose = require('mongoose');
//Import models
var DocumenTomercantilItem  = require("../models/documenTomercantilItem").documentoMercantilItemModel;

exports.DocumenTomercantilItem = DocumenTomercantilItem;

exports.findBydocumentoMercantilId = function(req, res) {
	var findByIdCallback =
	function(err, documenTomercantilItem){
		if(err) return res.send(500, err.message);

		console.log('GET/documentoMercantilItems/documentoMercantil/' + req.params.id);
		res.status(200).jsonp(documenTomercantilItem);
    };

    DocumenTomercantilItem.find({documentoMercantilID: req.params.id}, findByIdCallback); //luego de realizar la busqueda ejecuta el callback
};

var findFiltered = function(filter, callback) {
	DocumenTomercantilItem.find(filter, callback);
}
exports.findFiltered = findFiltered;

var addItem = function(item, ok_callback, err_callback) {
    var documenTomercantilItem = new DocumenTomercantilItem({
        tipo:    	              item.tipo,
        productoID:             item.productoID,
        nombre:     	          item.nombre,
        cantidad:               item.cantidad,
        precio:                 item.precio,
        iva:                    item.iva,
        documentoMercantilID:   item.documentoMercantilID
    });

    documenTomercantilItem.save(function(err, documenTomercantilItem) { //almaceno el documenTomercantilItem en la base de datos
        if(err)
					return err_callback(err);
				else
					return ok_callback(documenTomercantilItem);
    });
};
exports.addItem = addItem;

exports.add = function(req, res) {
    console.log('POST');
    console.log(req.body);

	addItem(req.body,function(documenTomercantilItem){
		res.status(200).jsonp(documenTomercantilItem)
	},function(err){
        return res.status(500).send( err.message)
    });
};

exports.update = function(req, res) {
    console.log('UPDATE');
    console.log(req.body);

    DocumenTomercantilItem.findById(req.params.id, function(err, documenTomercantilItem) { //"documenTomercantilItem" es el objeto que me devuelve la busqueda

        if (documenTomercantilItem != null) { //Es la modificacion de un producto existente
            //actualizo todos los campos de ese "documenTomercantilItem"
            documenTomercantilItem.tipo =                   req.body.tipo;
            documenTomercantilItem.productoID =             req.body.productoID
            documenTomercantilItem.nombre =                 req.body.nombre;
            documenTomercantilItem.cantidad =               req.body.cantidad;
            documenTomercantilItem.precio =                 req.body.precio;
            documenTomercantilItem.iva =                        req.body.iva;
            documenTomercantilItem.documentoMercantilID =     req.body.documentoMercantilID;

            documenTomercantilItem.save(function(err) { //almaceno en la base "documenTomercantilItem" para que quede actualizada con los nuevos cambios
                if(err) return res.status(500).send(err.message);
                res.status(200).jsonp(documenTomercantilItem);
            });
        } else { //Es la creacion de un producto cuando es agregado mediante una modificacion
            var documenTomercantilItem = new DocumenTomercantilItem({ //creo un nuevo documenTomercantilItem en base a lo recibido en el request
                tipo:                       req.body.tipo,
                productoID:                 req.body.productoID,
                nombre:                     req.body.nombre,
                cantidad:                   req.body.cantidad,
                precio:                     req.body.precio,
                iva:                        req.body.iva,
                documentoMercantilID:      req.body.documentoMercantilID
            });

            documenTomercantilItem.save(function(err, documenTomercantilItem) { //almaceno el documenTomercantilItem en la base de datos
                if(err) return res.status(500).send( err.message);
                res.status(200).jsonp(documenTomercantilItem);
            });
        }
    });
};


exports.delete = function(req, res) {
    console.log('DELETE');
    console.log(req.body);

    DocumenTomercantilItem.findById(req.params.id, function(err, documenTomercantilItem) {
        documenTomercantilItem.remove(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).send(documenTomercantilItem);
        })
    });
};
