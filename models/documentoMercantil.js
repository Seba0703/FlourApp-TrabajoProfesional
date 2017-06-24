var mongoose = require("mongoose"); //instancio objeto "mongoose"
var Schema = mongoose.Schema;
var RetencionFactura  = require("../models/retencionFactura").retencionFacturaModel;

var documentoMercantilSchema = new mongoose.Schema({
  tipo: 				        { type: String }, /*tipo: fact_compra, fact_venta, remito u ord_compra*/
  puntoDeVenta:         { type: Number },
  tipoFactura:          { type: String }, /*tipoFactura: A, B o C*/
  numeroFactura:        { type: Number },
  fechaEmision:   	    { type: Date   },
  fechaVencimiento:   	{ type: Date   },
  comprobanteReferencia:{ type: Number },
  empresaID:    	  	{ type: String },
  condicionPago: 	 	{ type: String },
  listaPrecioNombre: 	{ type: String },
  retencionIG: 	  		{ type: Number },
  retencionIVA: 	  	{ type: Number },
  retencionIB: 	  		{ type: Number },
  impuestosInternos: 	{ type: Number },
  impuestosMunicipales: { type: Number },
  CAI:                  { type: Number },
  fechaVtoCAI:   	    { type: Date   },
  retencionesFactura_ids: [{ type: Schema.Types.ObjectId, ref: 'RetencionFactura', default:[]}]
});


documentoMercantilSchema.pre('remove', function(next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    RetencionFactura.remove({'_id':{'$in':this.retencionFacturas_ids}}).exec();
    next();
});

exports.documentoMercantilModel = mongoose.model('DocumentoMercantil', documentoMercantilSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos
