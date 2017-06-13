var mongoose = require('mongoose');
//Import models
var DocumentoMercantilVencimiento  = require("../models/documentoMercantilVencimiento").documentoMercantilVencimientoModel;

exports.add = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var documentoMercantilVencimiento = new DocumentoMercantilVencimiento({
        importe:    	              req.body.importe,
        factura_id:             req.body.factura_id,
        cobrado:     	          req.body.cobrado,
        fecha: req.body.fecha
    });

    documentoMercantilVencimiento.save(function(err, documentoMercantilVencimiento) { //almaceno el documenTomercantilVencimiento en la base de datos
        if(err)
            return res.status(500).send( err.message);
        else
            return res.status(200).jsonp(documentoMercantilVencimiento);
    });
};

exports.update = function(req, res) {
    console.log('UPDATE');
    console.log(req.body);

    DocumentoMercantilVencimiento.findById(req.params.id, function(err, documentoMercantilVencimiento) { //"documentoMercantilVencimiento" es el objeto que me devuelve la busqueda

        if (documentoMercantilVencimiento != null) { //Es la modificacion de un producto existente
            //actualizo todos los campos de ese "documentoMercantilVencimiento"
            documentoMercantilVencimiento.importe =                   req.body.importe;
            documentoMercantilVencimiento.factura_id =             req.body.factura_id
            documentoMercantilVencimiento.cobrado =                 req.body.cobrado;
            documentoMercantilVencimiento.fecha =               req.body.fecha;


            documentoMercantilVencimiento.save(function(err) { //almaceno en la base "documentoMercantilVencimiento" para que quede actualizada con los nuevos cambios
                if(err) return res.status(500).send(err.message);
                res.status(200).jsonp(documentoMercantilVencimiento);
            });
        }
    });
};

exports.findBydocumentoMercantilId = function(req, res) {
    var findByIdCallback =
        function(err, documentoMercantilVencimiento){
            if(err) return res.send(500, err.message);

            console.log('GET/documentosMercantilesVencimientos/documentoMercantil/' + req.params.id);
            res.status(200).jsonp(documentoMercantilVencimiento);
        };

    DocumentoMercantilVencimiento.find({factura_id: req.params.id}, findByIdCallback); //luego de realizar la busqueda ejecuta el callback
};

exports.delete = function(req, res) {
    console.log('DELETE');
    console.log(req.body);

    DocumentoMercantilVencimiento.findById(req.params.id, function(err, documenTomercantilItem) {
        documenTomercantilItem.remove(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).send(documenTomercantilItem);
        })
    });
};