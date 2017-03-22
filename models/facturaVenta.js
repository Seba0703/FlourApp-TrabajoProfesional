var mongoose = require("mongoose"); //instancio objeto "mongoose"
var Schema = mongoose.Schema;

var facturaVentaSchema = new mongoose.Schema({
  puntoDeVenta:         { type: Number },
  tipoFactura:          { type: String },
  numeroFactura:        { type: Number },
  fechaEmision:   	    { type: Date   },
  comprobanteReferencia:{ type: Number },
  clienteID:    	  		  { type: Schema.Types.ObjectId, ref: 'Cliente'},
  retencionIG: 	  		  { type: Number },
  retencionIVA: 	  		{ type: Number },
  retencionIB: 	  		  { type: Number },
  impuestosInternos: 	  { type: Number },
  impuestosMunicipales: { type: Number },
  CAI:                  { type: Number },
  fechaVtoCAI:   	      { type: Date   }
});

exports.facturaVentaModel = mongoose.model('FacturaVenta', facturaVentaSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos
