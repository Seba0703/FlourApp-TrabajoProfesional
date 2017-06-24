var mongoose = require('mongoose');
//Import models
var DocumentoMercantil  = require("../models/documentoMercantil").documentoMercantilModel;
var documentoMercantilItemController = require("./documentoMercantilItemController");
var facturacionDatosPropiosModel  = require("../models/facturacionDatosPropios").facturacionDatosPropiosModel;
var Cliente  = require("../models/cliente").clienteModel;
var Proveedor  = require("../models/proveedor").proveedorModel;
var RetencionFactura = require("../models/retencionFactura").retencionFacturaModel;
var fs = require('fs');
var path = require('path');
var http = require('http');

exports.findAll = function(req, res) {
    DocumentoMercantil.find({})
        .populate({ path: 'retencionesFactura_ids',
            populate: {path: 'retencion_id',
                populate: {path: 'rangos_ids'}
            }
        })
        .exec(function(err, documentosmercantiles){
        if(err) res.send(500, err.message);

        console.log('GET/documentosMercantiles');
        res.status(200).jsonp(documentosmercantiles);
    });
};

function normalizeTipo (tipo) {
  if (tipo=='Compra'||tipo=='compra'||tipo=='fact_compra')
    return 'fact_compra';
  if (tipo=='Venta'||tipo=='venta'||tipo=='fact_venta')
    return 'fact_venta';
  return '';
}

exports.findFiltered = function(req, res) {
    var normalizedTipo = normalizeTipo(req.query.tipo);
    var busqueda = {
      tipo: normalizedTipo,
      numeroFactura: req.query.numeroFactura,
      fechaEmision: { $gte: req.query.desde, $lte: req.query.hasta }
    }

    DocumentoMercantil.find(busqueda)
        .populate({ path: 'retencionesFactura_ids',
            populate: {path: 'retencion_id',
                populate: {path: 'rangos_ids'}
            }
        })
        .exec(function(err, documentosmercantiles){
		if(err) res.send(500, err.message);
		console.log('GET/documentosMercantiles');
    console.log(req.query);
    var results = [];
    var finalResults = [];

    function buscarItems(documento) {
      return new Promise(function(resolve, reject) {
          documentoMercantilItemController.findFiltered({documentoMercantilID: documento._id}, function(err, documenTomercantilItem){
            if (err) return reject(err);

            var Tabla;
            if(documento.tipo == "Compra" || documento.tipo == "compra" || documento.tipo == "fact_compra") {
              Tabla = Proveedor;
            }
            if(documento.tipo == "Venta" || documento.tipo == "venta" || documento.tipo == "fact_venta") {
              Tabla = Cliente;
            }

            if(Tabla!=undefined) {
              Tabla.findById(documento.empresaID, function(err, empresa){
                if (err) return reject(err);
                var prods = [];
                var subtotal = 0;
                var totalIVA = 0;
                for (var i = 0; i < documenTomercantilItem.length; ++i) {
                  subtotal += documenTomercantilItem[i].precio*documenTomercantilItem[i].cantidad;
                  totalIVA += (documenTomercantilItem[i].cantidad*documenTomercantilItem[i].precio*documenTomercantilItem[i].iva/100);
                  prods.push(
                    {
                      tipo:    	              documenTomercantilItem[i].tipo,
                      productoID:             documenTomercantilItem[i].productoID,
                      nombre:     	          documenTomercantilItem[i].nombre,
                      cantidad:               documenTomercantilItem[i].cantidad,
                      precio:                 documenTomercantilItem[i].precio,
                      iva:                    documenTomercantilItem[i].iva,
                      documentoMercantilID:   documenTomercantilItem[i].documentoMercantilID
                    }
                  );
                }
                var otros = 0;
                function acumularImpuesto(subtotal, porcentaje) {
                  if(porcentaje!=undefined)
                    return (subtotal*porcentaje/100);
                  else
                    return 0;
                }

                otros += acumularImpuesto(subtotal,documento.retencionIG);
                otros += acumularImpuesto(subtotal,documento.retencionIVA);
                otros += acumularImpuesto(subtotal,documento.retencionIB);
                otros += acumularImpuesto(subtotal,documento.impuestosInternos);
                otros += acumularImpuesto(subtotal,documento.impuestosMunicipales);

                results.push(
                  {
                      tipo:                   documento.tipo,
                      puntoDeVenta:           documento.puntoDeVenta,
                      tipoFactura:            documento.tipoFactura,
                      numeroFactura:          documento.numeroFactura,
                      fechaEmision:           documento.fechaEmision,
                      fechaVencimiento:       documento.fechaVencimiento,
                      comprobanteReferencia:  documento.comprobanteReferencia,
                      empresaID:              documento.empresaID,
                      condicionPago:          documento.condicionPago,
                      listaPrecioNombre:      documento.listaPrecioNombre,
                      retencionIG:            documento.retencionIG,
                      retencionIVA:           documento.retencionIVA,
                      retencionIB:            documento.retencionIB,
                      impuestosInternos:      documento.impuestosInternos,
                      impuestosMunicipales:   documento.impuestosMunicipales,
                      CAI:                    documento.CAI,
                      fechaVtoCAI:            documento.fechaVtoCAI,
                      productos: prods,
                      subtotal: subtotal,
                      iva:  totalIVA,
                      otros: otros,
                      total: subtotal+totalIVA+otros,
                      contraparte: empresa
                  }
                );
                resolve(documenTomercantilItem);
              });
            }
          });
      });
    }

    var promises = [];
    for (var i = 0; i < documentosmercantiles.length; ++i) {
        promises.push(buscarItems(documentosmercantiles[i]));
    }
    Promise.all(promises).then(function() {
      res.status(200).jsonp(results);
    }, function(err) {
        res.send(500, err.message);
    });
  });
};


exports.findById = function(req, res) {
	var findByIdCallback =
	function(err, documentomercantil){
		if(err) return res.send(500, err.message);

		console.log('GET/documentosmercantiles/' + req.params.id);
		res.status(200).jsonp(documentomercantil);
    };

    DocumentoMercantil.findById(req.params.id)
        .populate({ path: 'retencionesFactura_ids',
            populate: {path: 'retencion_id',
                populate: {path: 'rangos_ids'}
            }
        })
        .exec(findByIdCallback); //luego de realizar la busqueda ejecuta el callback
};

exports.findByTipo = function(req, res) {
    var findByTipoCallback =
    function(err, documentosmercantiles){
        if(err) return res.send(500, err.message);

        console.log('GET/documentosmercantiles/' + req.params.tipo);
        res.status(200).jsonp(documentosmercantiles);
    };

    DocumentoMercantil.find({tipo: req.params.tipo})
        .populate({ path: 'retencionesFactura_ids',
            populate: {path: 'retencion_id',
                populate: {path: 'rangos_ids'}
            }
        })
        .exec(findByTipoCallback); //luego de realizar la busqueda ejecuta el callback
};

//para pasar i  inmutado
retencionSave = function(i, rentecionesFactura, rentecionesFactura_ids, retencionFactura, req, res) {
    retencionFactura.save(function(err, retencionFactura) { //almaceno el retencion en la base de datos
        if(err) return res.status(500).send( err.message);
        rentecionesFactura_ids.push(retencionFactura._id);
        if(i == (rentecionesFactura.length - 1)) {
            onlyDocumentoSave(rentecionesFactura_ids, req, res);
        }
    });
};

onlyDocumentoSave = function(retencionesFactura_ids, req, res) {
    var documentomercantil = new DocumentoMercantil({ //creo un nuevo documentomercantil en base a lo recibido en el request
        tipo:                   req.body.tipo,
        puntoDeVenta:           req.body.puntoDeVenta,
        tipoFactura:            req.body.tipoFactura,
        numeroFactura:          req.body.numeroFactura,
        fechaEmision:           req.body.fechaEmision,
        fechaVencimiento:       req.body.fechaVencimiento,
        comprobanteReferencia:  req.body.comprobanteReferencia,
        empresaID:              req.body.empresaID,
        condicionPago:          req.body.condicionPago,
        listaPrecioNombre:      req.body.listaPrecioNombre,
        retencionIG:            req.body.retencionIG,
        retencionIVA:           req.body.retencionIVA,
        retencionIB:            req.body.retencionIB,
        impuestosInternos:      req.body.impuestosInternos,
        impuestosMunicipales:   req.body.impuestosMunicipales,
        CAI:                    req.body.CAI,
        fechaVtoCAI:            req.body.fechaVtoCAI,
        retencionesFactura_ids: retencionesFactura_ids
    });

    documentomercantil.save(function(err, documentomercantil) { //almaceno el documentomercantil en la base de datos
        if(err) return res.status(500).send( err.message);
        res.status(200).jsonp(documentomercantil);
    });
};

exports.add = function(req, res) {
    console.log('POST');
    console.log(req.body);

    var rentecionesFactura = req.body.retencionesFactura_ids;
    var rentecionesFactura_ids = [];
    for (var i = 0; i < rentecionesFactura.length; i++) {

        var retencionFactura = new RetencionFactura({
            retencion_id: rentecionesFactura[i].retencion_id,
            importe: rentecionesFactura[i].importe
        });

        retencionSave(i, rentecionesFactura, rentecionesFactura_ids, retencionFactura, req, res);
    }

    if (rentecionesFactura.length == 0) {
        onlyDocumentoSave(rentecionesFactura_ids, req, res);
    }

};


exports.update = function(req, res) {
	console.log('UPDATE');
    console.log(req.body);

    DocumentoMercantil.findById(req.params.id, function(err, documentomercantil) { //"documentomercantil" es el objeto que me devuelve la busqueda

        //actualizo todos los campos de ese "documentomercantil"
        documentomercantil.tipo =                   req.body.tipo;
        documentomercantil.puntoDeVenta =           req.body.puntoDeVenta;
        documentomercantil.tipoFactura =            req.body.tipoFactura;
        documentomercantil.numeroFactura =          req.body.numeroFactura;
        documentomercantil.fechaEmision =           req.body.fechaEmision;
        documentomercantil.fechaVencimiento =       req.body.fechaVencimiento;
        documentomercantil.comprobanteReferencia =  req.body.comprobanteReferencia;
        documentomercantil.empresaID =              req.body.empresaID;
        documentomercantil.condicionPago =          req.body.condicionPago;
        documentomercantil.listaPrecioNombre =      req.body.listaPrecioNombre;
        documentomercantil.retencionIG =            req.body.retencionIG;
        documentomercantil.retencionIVA =           req.body.retencionIVA;
        documentomercantil.retencionIB =            req.body.retencionIB;
        documentomercantil.impuestosInternos =      req.body.impuestosInternos;
        documentomercantil.impuestosMunicipales =   req.body.impuestosMunicipales;
        documentomercantil.CAI =                    req.body.CAI;
        documentomercantil.fechaVtoCAI =            req.body.fechaVtoCAI;
        
        RetencionFactura.remove({'_id':{'$in':req.body.retencionesDelete_ids}}).exec();

        var retencionesFactura = req.body.retencionesFactura_ids;
        var retencionesFactura_ids = [];

        for (var i = 0; i < retencionesFactura.length; i++) {

            if (retencionesFactura[i]._id) {
                retencionesFactura_ids.push(retencionesFactura[i]._id);
                retencionFacturaUpdate(i, retencionesFactura, retencionesFactura_ids, documentomercantil, res);
            } else {
                var retencionFactura = new RetencionFactura({
                    retencion_id: retencionesFactura[i].retencion_id,
                    importe: retencionesFactura[i].importe
                });

                retencionFacturaSave(i, retencionesFactura, retencionesFactura_ids, documentomercantil, retencionFactura, res);
            }
        }

        if(retencionesFactura.length == 0) {
            documentomercantil.save(function (err) { //almaceno en la base "documentomercantil" para que quede actualizada con los nuevos cambios
                if (err) return res.status(500).send(err.message);
                res.status(200).jsonp(documentomercantil);
            });
        }
    });
};


retencionFacturaUpdate = function(i, retencionesFactura, retencionesFactura_ids, documentomercantil, res ) {
    RetencionFactura.findById({'_id': retencionesFactura[i]._id}, function(err, retencionFactura) {
        retencionFactura.retencion_id = retencionesFactura[i].retencion_id;
        retencionFactura.importe = retencionesFactura[i].importe;

        retencionFactura.save(function(err, rangoRet) { //almaceno en la base "retencion" para que quede actualizada con los nuevos cambios
            if(err) return res.status(500).send(err.message);
            updateDocumento(i, retencionesFactura, documentomercantil, retencionesFactura_ids, res);
        });
    });
};

updateDocumento = function (i, retencionesFactura, documentomercantil, retencionesFactura_ids, res) {
    if(i == (retencionesFactura.length - 1)) {
        documentomercantil.retencionesFactura_ids = retencionesFactura_ids;

        documentomercantil.save(function(err, documento) { //almaceno el retencion en la base de datos
            if(err) return res.status(500).send( err.message);
            res.status(200).jsonp(documento);
        });
    }
};

retencionFacturaSave = function(i, retencionesFactura, retencionesFactura_ids, documentomercantil, retencionFactura, res) {
    retencionFactura.save(function(err, rangoRetencion) { //almaceno el retencion en la base de datos
        if (err) return res.status(500).send(err.message);
        retencionesFactura_ids.push(rangoRetencion._id);
        updateDocumento(i, retencionesFactura, documentomercantil, retencionesFactura_ids, res);
    });
};


exports.delete = function(req, res) {
	console.log('DELETE');
	console.log(req.params.id);

    DocumentoMercantil.findById(req.params.id, function(err, documentomercantil) {
        documentomercantil.remove(function(err) {
            if(err) return res.status(500).send(err.message);
			res.status(200).send(documentomercantil);
        })
    });
};

toReadableDate = function(date) {
  if(date==undefined)
    return "";
  var dateSplit = (date).toLocaleDateString().split("T");
  var partSplit = dateSplit[0].split("-");
  var newDate = partSplit[2] + '/' + partSplit[1] + '/' + partSplit[0];
  return newDate;
}

getMontoIVA = function(iva, items) {
  var sum = 0;
  for(var j = 0; j < items.length; j++) {
    if(items[j].iva == iva)
      sum += (parseFloat(items[j].precio)*parseFloat(items[j].cantidad)*parseFloat(items[j].iva))/100;
  }
  return sum;
}

exports.exportPDF = function(req, res) {
	console.log('GET/documentosMercantiles/pdf');
	console.log(req.params.id);

  DocumentoMercantil.findById(req.params.id, function(err, documentomercantil) {
    if(err) return res.status(500).send(err.message);
    documentoMercantilItemController.findFiltered({documentoMercantilID: req.params.id}, function(err, documenTomercantilItems){
      if(err) return res.status(500).send(err.message);
      facturacionDatosPropiosModel.find({}, function(err, datosPropios){
        if(err) return res.status(500).send(err.message);

        var Tabla;
        var tipo;
        var path_template = "templates/factura.html";
        if(documentomercantil.tipo == "Compra" || documentomercantil.tipo == "compra" || documentomercantil.tipo == "fact_compra") {
          Tabla = Proveedor;
          tipo = "c";
        }
        if(documentomercantil.tipo == "Venta" || documentomercantil.tipo == "venta" || documentomercantil.tipo == "fact_venta") {
          Tabla = Cliente;
          tipo = "v";
        }
        if(documentomercantil.tipo == "remito" || documentomercantil.tipo == "Remito") {
          Tabla = Cliente;
          tipo = "r";
          path_template = "templates/remito.html";
        }
        if(documentomercantil.tipo == "ord_compra" || documentomercantil.tipo == "Ord_Compra") {
          Tabla = Proveedor;
          tipo = "o";
          path_template = "templates/ordenCompra.html";
        }
        if(Tabla!=undefined) {
          Tabla.findById(documentomercantil.empresaID, function(err, empresa){
            var newDate = "";
            var emisor = {
              razonSocial: "",
              cuit: "",
              domicilioComercial: "",
              categoriaFiscal: "",
              ingresosBrutos: "",
              inicioActividades: "",
            };
            var logo = "";
            if(tipo == "c" || tipo == "o") {
               emisor = {
                 razonSocial: empresa.nombreEmpresa,
                 cuit: empresa.cuit,
                 domicilioComercial: empresa.direccion,
                 categoriaFiscal: empresa.categoriaFiscal,
                 ingresosBrutos: "",
                 inicioActividades: ""
               }
               receptor = datosPropios[0];
               if (tipo == "o")
                logo = "http://localhost:3000/img/logo.png";
            }
            if(tipo == "v" || tipo == "r") {
              newDate = toReadableDate(datosPropios[0].inicioActividades);
              logo = "http://localhost:3000/img/logo.png";
              emisor = datosPropios[0];
              receptor = {
                razonSocial: empresa.nombreEmpresa,
                cuit: empresa.cuit,
                domicilioComercial: empresa.direccion,
                categoriaFiscal: empresa.categoriaFiscal,
                ingresosBrutos: "",
                inicioActividades: ""
              };
            }
            var newDate2 = toReadableDate(documentomercantil.fechaEmision);
            var newDate3 = toReadableDate(documentomercantil.fechaVencimiento);
            var newDate4 = toReadableDate(documentomercantil.fechaVtoCAI);
            var codigoComprobante =
                (documentomercantil.tipoFactura == 'A')?"COD. 01"
               :(documentomercantil.tipoFactura == 'B')?"COD. 06"
               :(documentomercantil.tipoFactura == 'C')?"COD. 11"
               :(documentomercantil.tipoFactura == 'M')?"COD. 51"
               :(documentomercantil.tipoFactura == 'R')?"COD. 91"
               :"";
            var newItems = [];
            var total = 0;
            var neto = 0;
            for(var i = 0; i < documenTomercantilItems.length; i++) {
              var doc = documenTomercantilItems[i];
              var bonif = (doc.bonificacion==undefined
              || doc.bonificacion=="")?0:(doc.bonificacion);
              var subtotal = doc.precio*doc.cantidad - (doc.precio*doc.cantidad*bonif/100);
              var subtotalIVA = subtotal + subtotal*doc.iva/100;
              total += subtotalIVA;
              neto += subtotal;
              newItems.push({
                tipo: doc.tipo,
                productoID: doc.productoID,
                nombre: doc.nombre,
                cantidad: doc.cantidad,
                precio: doc.precio,
                bonificacion: bonif,
                iva: doc.iva,
                documentoMercantilID: doc.documentoMercantilID,
                subtotal: subtotal,
                subtotalIVA: subtotalIVA
              });
            }
            var montoRetencionIG = 0,
                montoRetencionIVA = 0,
                montoRetencionIB = 0,
                montoImpuestosInternos = 0,
                montoImpuestosExternos = 0,
                importeNeto = neto,
                montoIVA27 = getMontoIVA(27,documenTomercantilItems),
                montoIVA21 = getMontoIVA(21,documenTomercantilItems),
                montoIVA10_5 = getMontoIVA(10.5,documenTomercantilItems),
                montoIVA5 = getMontoIVA(5,documenTomercantilItems),
                montoIVA2_5 = getMontoIVA(2.5,documenTomercantilItems),
                montoIVA0 = getMontoIVA(0,documenTomercantilItems),
                montoOtrosTributos = 0,
                montoTotal = total;

                console.log('-');

            var post_data= JSON.stringify({
              template:{
                content: fs.readFileSync(path.join(path_template), 'utf8'),
                engine: 'jsrender',
                recipe : 'phantom-pdf'
               },
              options:{
                  'preview':'true'
              },
              data: {
                  img_path: logo,
                  emisor: emisor,
                  receptor: receptor,
                  datos_factura: documentomercantil,
                  fechaInicioActividades: newDate,
                  fechaEmision: newDate2,
                  fechaVencimiento: newDate3,
                  codigoComprobante: codigoComprobante,
                  items: newItems,
                  fechaVtoCAI: newDate4,
                  montoRetencionIG: montoRetencionIG,
                  montoRetencionIVA: montoRetencionIVA,
                  montoRetencionIB: montoRetencionIB,
                  montoImpuestosInternos: montoImpuestosInternos,
                  montoImpuestosExternos: montoImpuestosExternos,
                  importeNeto: importeNeto,
                  montoIVA27: montoIVA27,
                  montoIVA21: montoIVA21,
                  montoIVA10_5: montoIVA10_5,
                  montoIVA5: montoIVA5,
                  montoIVA2_5: montoIVA2_5,
                  montoIVA0: montoIVA0,
                  montoOtrosTributos: montoOtrosTributos,
                  montoTotal: montoTotal,
                  montoOtrosTributos: montoRetencionIG+montoRetencionIVA+montoImpuestosInternos+montoImpuestosExternos
              }
            });
            console.log('-');
            var post_options = {
                host: 'localhost',
                port: '3001',
                path: '/api/report',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            console.log('-');
            var post_req = http.request(post_options, function(response) {
                response.pipe(res);
              }).on('error', function(e) {
                res.sendStatus(500);
              });
              post_req.write(post_data);
              post_req.end();
          });
        }
  		});
    });
  });
};
