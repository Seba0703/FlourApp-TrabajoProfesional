var mongoose = require('mongoose');
//Import models
var MateriaPrima  = require("../models/materiaPrima").materiaPrimaModel;
var ProductoSemiProcesado  = require("../models/productoSemiProcesado").productoSemiProcesadoModel;
var ProductoTerminado  = require("../models/productoTerminado").productoTerminadoModel;

var DocumentoMercantil  = require("../models/documentoMercantil").documentoMercantilModel;
var DocumentoMercantilItem = require("./documentoMercantilItemController").DocumenTomercantilItem;

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
        stockMin: materiasPrima[i].stockMin,
        stockOptimo: materiasPrima[i].stockOptimo
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
        stockMin: semiProcesados[i].stockMin,
        stockOptimo: semiProcesados[i].stockOptimo
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
        stockMin: productosTerminados[i].stockMin,
        stockOptimo: productosTerminados[i].stockOptimo
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
    var promises2 = [];
    var productos2 = [];
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date();
    var lastDay = new Date();
    firstDay.setFullYear(y, m - 2, 1)
    lastDay.setFullYear(y, m + 1, 0)
    for(var i = 0; i < productos.length; ++i) {
      promises2.push(estadosProducto(productos[i], firstDay, lastDay));
    }
    Promise.all(promises2).then(function(productosResult) {
      res.status(200).jsonp(productosResult);
    }, function(err) {
      res.send(500, err.message);
    });
  }, function(err) {
      res.send(500, err.message);
  });
};

var calcularStockOptimo = function(ultimasCompras, producto) {
  var optimo = 0;
  var sum = 0;
  ultimasCompras.map(function(item, index){
    sum += item.cantidad;
  });

  if(producto.cantidad > producto.stockMax) { // FALTA STOCK?
    if(sum > producto.stockOptimo) {          // COMPRAMOS MAS QUE EL OPTIMO?
                                              // SI. HAY QUE COMPRAR MAS


      } // NO. ENTONCES TENES QUE COMPRAR MAS HASTA LLEGAR AL OPTIMO. NO MODIFICO.
  } else
  if(producto.cantidad < producto.stockMin) { // SOBRA STOCK?
    if(sum < producto.stockOptimo) {          // COMPRAMOS MENOS QUE EL OPTIMO?
                                              // HAY QUE COMPRAR MAS

    } // NO. ENTONCES TENES QUE COMPRAR MAS HASTA LLEGAR AL OPTIMO. NO MODIFICO.
  } else {
    optimo = producto.stockOptimo;
  }
  console.log("COMPARO");
  console.log(sum);
  console.log(producto.stockOptimo);
  console.log("------");
  if(sum>producto.stockOptimo) optimo = 9999
  else if(sum<producto.stockOptimo) optimo = -8888
  else optimo = producto.stockOptimo;

  return optimo;
}

var estadosProducto = function(producto, desde, hasta) {
  return new Promise(function(resolve, reject) {
    var productosResult = {};

    var findByIdCallback =
    function(err, documentoMercantilItems) {
      if(err) {
        reject(err);
      }

      var results = [];
      for(var i = 0; i < documentoMercantilItems.length; ++i) {
        if(documentoMercantilItems[i].documentoMercantilID != undefined)
          results.push(documentoMercantilItems[i]);
      }

      var optimo = calcularStockOptimo(results, producto);

      productosResult =
        {
          _id: producto._id,
          tipo: producto.tipo,
          nombre: producto.nombre,
          cantidad: producto.cantidad,
          stockMax: producto.stockMax,
          stockMin: producto.stockMin,
          stockOptimo: optimo
        };
      resolve(productosResult);
    };

    DocumentoMercantilItem.find({"productoID": producto._id}).populate({
      path: 'documentoMercantilID',
      match: {
        fechaEmision: {
          $gte: desde,
          $lte: hasta
        }
      }
    }).exec(findByIdCallback);
  });
}

exports.ultimosPreciosProducto = function(req, res) {
  console.log('GET/ultimosEstadosProducto');
  console.log(req.params.id);
  console.log(req.query.desde);
  console.log(req.query.hasta);

  var findByIdCallback = function(err, documentoMercantilItems){
    if(err) return res.send(500, err.message);

    var results = {
      compra: [],
      venta: []
    };

    for(var i = 0; i < documentoMercantilItems.length; ++i) {
      if(documentoMercantilItems[i].documentoMercantilID != undefined) {
        if(documentoMercantilItems[i].documentoMercantilID.tipo == 'fact_compra')
          results.compra.push(documentoMercantilItems[i]);
        if(documentoMercantilItems[i].documentoMercantilID.tipo == 'fact_venta')
          results.venta.push(documentoMercantilItems[i]);
        }
    }

    console.log('GET/ultimosEstadosProducto/' + req.params.id);
    res.status(200).jsonp(results);
  };

  DocumentoMercantilItem.find({"productoID": req.params.id}).populate({
    path: 'documentoMercantilID',
    match: {
      fechaEmision: {
        $gte: req.query.desde,
        $lte: req.query.hasta
      }
    }
  }).exec(findByIdCallback);
}
