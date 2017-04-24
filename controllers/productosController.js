var mongoose = require('mongoose');
//Import models
var MateriaPrima  = require("../models/materiaPrima").materiaPrimaModel;
var ProductoSemiProcesado  = require("../models/productoSemiProcesado").productoSemiProcesadoModel;
var ProductoTerminado  = require("../models/productoTerminado").productoTerminadoModel;

var DocumentoMercantil  = require("../models/documentoMercantil").documentoMercantilModel;
//var DocumentoMercantilItem = require("../models/documentoMercantilItem").documentoMercantilItemModel;

var buscarMateriaPrima = function(productos) {
  return new Promise(function(resolve, reject) {
    MateriaPrima.find(function(err, materiasPrima){
    if(err) reject(err.message);
    console.log('GET/materiasPrima');
    for(var i = 0; i < materiasPrima.length; ++i) {
      productos.push({
        _id: materiasPrima[i]._id,
        tipo: materiasPrima[i].tipo,
        nombre: materiasPrima[i].nombre,
        cantidad: materiasPrima[i].cantidad,
        stockMax: materiasPrima[i].stockMax,
        stockMin: materiasPrima[i].stockMin
      });
    }
    resolve(materiasPrima);
    });
  });
}

var buscarSemiProcesado = function(productos) {
  return new Promise(function(resolve, reject) {
    ProductoSemiProcesado.find(function(err, semiProcesados){
    if(err) reject(err.message);
    console.log('GET/semiProcesados');
    for(var i = 0; i < semiProcesados.length; ++i) {
      productos.push({
        _id: semiProcesados[i]._id,
        tipo: semiProcesados[i].tipo,
        nombre: semiProcesados[i].nombre,
        cantidad: semiProcesados[i].cantidad,
        stockMax: semiProcesados[i].stockMax,
        stockMin: semiProcesados[i].stockMin
      });
    }
    resolve(semiProcesados);
    });
  });
}

var buscarTerminados = function(productos) {
  return new Promise(function(resolve, reject) {
    ProductoTerminado.find(function(err, productosTerminados){
    if(err) reject(err.message);
    console.log('GET/productosTerminados');
    for(var i = 0; i < productosTerminados.length; ++i) {
      productos.push({
        _id: productosTerminados[i]._id,
        tipo: productosTerminados[i].tipo,
        nombre: productosTerminados[i].nombre,
        cantidad: productosTerminados[i].cantidad,
        stockMax: productosTerminados[i].stockMax,
        stockMin: productosTerminados[i].stockMin
      });
    }
    resolve(productosTerminados);
    });
  });
}

exports.estadoStock = function(req, res) {
  console.log('GET/informeEstadoStock');
  var productos = [];
  var promises = [];
  promises.push(buscarMateriaPrima(productos));
  promises.push(buscarSemiProcesado(productos));
  promises.push(buscarTerminados(productos));

  Promise.all(promises).then(function() {
    res.status(200).jsonp(productos);
  }, function(err) {
      res.send(500, err.message);
  });
};

exports.ultimosEstadosProducto = function(req, res) {
  console.log('GET/ultimosEstadosProducto');
  console.log(req.params.id);

  var findByIdCallback =
  function(err, documentoMercantilItems){
    if(err) return res.send(500, err.message);

    console.log('GET/ultimosEstadosProducto/' + req.params.id);
    res.status(200).jsonp(documentoMercantilItems);
    };
  DocumentoMercantilItem.find({"productoID": req.params.id}).populate('documentoMercantilID').exec(findByIdCallback);
}
