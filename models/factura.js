var mongoose = require("mongoose"); //instancio objeto "mongoose"
var Schema = mongoose.Schema;

var facturaSchema = new mongoose.Schema({
  tipo: 				        { type: String }, /*tipo: Compra o Venta*/
  puntoDeVenta:         { type: Number },
  tipoFactura:          { type: String }, /*tipoFactura: A, B o C*/
  numeroFactura:        { type: Number },
  fechaEmision:   	    { type: Date   },
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
  fechaVtoCAI:   	    { type: Date   }
});

exports.facturaModel = mongoose.model('Factura', facturaSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos
