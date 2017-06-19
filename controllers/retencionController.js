var mongoose = require('mongoose');
//Import models
var Retencion  = require("../models/retencion").retencionModel;
var RangoRetencion  = require("../models/rangoRetencion").rangoRetencionModel;

exports.findAll = function(req, res) {
    Retencion.find({})
        .populate('rangos_ids')
        .exec(function(err, retenciones){
            if(err) res.send(500, err.message);

            console.log('GET/retenciones');
            res.status(200).jsonp(retenciones);
        });
};

exports.findById = function(req, res) {
    var findByIdCallback =
        function(err, retencion){
            if(err) return res.send(500, err.message);

            console.log('GET/retencion/' + req.params.id);
            res.status(200).jsonp(retencion);
        };

    Retencion.findById(req.params.id, findByIdCallback).populate('rangos_ids'); //luego de realizar la busqueda ejecuta el callback
};


exports.add = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var rangos = req.body.rangos_ids;
    var rangos_ids = [];
    for (var i = 0; i < rangos.length; i++) {

        var rangoRetencion = new RangoRetencion({
            desde: rangos[i].desde,
            hasta: rangos[i].hasta,
            porcentaje: rangos[i].porcentaje,
            importeFijo: rangos[i].importeFijo
        });

        retencionSave(i, rangos, rangos_ids, rangoRetencion, req, res);
    }

    if (rangos.length == 0) {
        var retencion = new Retencion({ //creo un nuevo retencion en base a lo recibido en el request
            nombre:    	req.body.nombre,
            codigo:     		  	req.body.codigo,
            codigoImpositivo:    req.body.codigoImpositivo

        });

        retencion.save(function(err, retencion) { //almaceno el retencion en la base de datos
            if(err) return res.status(500).send( err.message);
            res.status(200).jsonp(retencion);
        });
    }
};
//para pasar i  inmutado
retencionSave = function(i, rangos, rangos_ids, rangoRetencion, req, res) {
    rangoRetencion.save(function(err, rangoRetencion) { //almaceno el retencion en la base de datos
        if(err) return res.status(500).send( err.message);
        rangos_ids.push(rangoRetencion._id);
        if(i == (rangos.length - 1)) {
            var retencion = new Retencion({ //creo un nuevo retencion en base a lo recibido en el request
                nombre:    	req.body.nombre,
                codigo:     		  	req.body.codigo,
                codigoImpositivo:    req.body.codigoImpositivo,
                rangos_ids: rangos_ids

            });

            retencion.save(function(err, retencion) { //almaceno el retencion en la base de datos
                if(err) return res.status(500).send( err.message);
                res.status(200).jsonp(retencion);
            });
        }
    });
};


exports.update = function(req, res) {
    console.log('UPDATE');
    console.log(req.body);

    Retencion.findById(req.params.id, function(err, retencion) { //"retencion" es el objeto que me devuelve la busqueda

        //actualizo todos los campos de ese "retencion"
        retencion.nombre =   	req.body.nombre;
        retencion.codigo =     		  	req.body.codigo;
        retencion.codigoImpositivo =    req.body.codigoImpositivo;

        RangoRetencion.remove({'_id':{'$in':req.body.rangosDelete_ids}}).exec();

        var rangos = req.body.rangos_ids;
        var rangos_ids = [];

        for (var i = 0; i < rangos.length; i++) {

            if (rangos[i]._id) {
                rangos_ids.push(rangos[i]._id);
                rangoRetencionUpdate(i, rangos, rangos_ids, retencion, res);
            } else {
                var rangoRetencion = new RangoRetencion({
                    desde: rangos[i].desde,
                    hasta: rangos[i].hasta,
                    porcentaje: rangos[i].porcentaje,
                    importeFijo: rangos[i].importeFijo
                });

                rangoRetencionSave(i, rangos, rangos_ids, retencion, rangoRetencion, res);
            }
        }

        if (rangos.length == 0) {
            retencion.save(function(err, retencion) { //almaceno el retencion en la base de datos
                if(err) return res.status(500).send( err.message);
                res.status(200).jsonp(retencion);
            });
        }
    });
};

rangoRetencionSave = function(i, rangos, rangos_ids, retencion, rangoRetencion, res) {
    rangoRetencion.save(function(err, rangoRetencion) { //almaceno el retencion en la base de datos
        if (err) return res.status(500).send(err.message);
        rangos_ids.push(rangoRetencion._id);
        saveRetencion(i, rangos, retencion, rangos_ids, res);
    });
};

rangoRetencionUpdate = function(i, rangos, rangos_ids, retencion, res ) {
    RangoRetencion.findById({'_id': rangos[i]._id}, function(err, rangoRetencion) {
        rangoRetencion.desde = rangos[i].desde;
        rangoRetencion.hasta = rangos[i].hasta;
        rangoRetencion.porcentaje = rangos[i].porcentaje;
        rangoRetencion.importeFijo = rangos[i].importeFijo;

        rangoRetencion.save(function(err, rangoRet) { //almaceno en la base "retencion" para que quede actualizada con los nuevos cambios
            if(err) return res.status(500).send(err.message);
            saveRetencion(i, rangos, retencion, rangos_ids, res);
        });
    });
};

saveRetencion = function (i, rangos, retencion,rangos_ids, res) {
    if(i == (rangos.length - 1)) {
        retencion.rangos_ids = rangos_ids;

        retencion.save(function(err, retencion) { //almaceno el retencion en la base de datos
            if(err) return res.status(500).send( err.message);
            res.status(200).jsonp(retencion);
        });
    }
};


exports.delete = function(req, res) {
    console.log('DELETE');
    console.log(req.params.id);

    Retencion.findById(req.params.id, function(err, cliente) {
        cliente.remove(function(err) {
            if(err) return res.status(500).send(err.message);
            res.status(200).send(cliente);
        })
    });
};


