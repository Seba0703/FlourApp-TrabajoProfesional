var mongoose = require("mongoose"); //instancio objeto "mongoose"

var facturaVenta = new mongoose.Schema({
  puntoDeVenta:         { type: Number },
  numeroFactura:        { type: Number },
  fechaEmision:   	    { type: Date   },
  tipoFactura:          { type: String },
  comprobanteReferencia:{ type: Number },
  cuitCliente: 	  		  { type: Number },
  retencionIG: 	  		  { type: Number },
  retencionIVA: 	  		{ type: Number },
  retencionIB: 	  		  { type: Number },
  impuestosInternos: 	  { type: Number },
  impuestosMunicipales: { type: Number },
  CAI:                  { type: Number },
  fechaVtoCAI:   	      { type: Date   }
});

exports.facturaVentaModel = mongoose.model('FacturaVenta', facturaVentaSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos
