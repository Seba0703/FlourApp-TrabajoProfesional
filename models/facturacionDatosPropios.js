var mongoose = require("mongoose"); //instancio objeto "mongoose"

var facturacionDatosPropios = new mongoose.Schema({
  razonSocial:	        { type: String },
  cuit:   	  		      { type: Number },
  domicilioComercial:   { type: String },
  categoriaFiscal:      { type: String },
  ingresosBrutos:       { type: String },
  inicioActividades:   	{ type: Date   }
});

exports.facturacionDatosPropiosModel = mongoose.model('FacturacionDatosPropios', facturacionDatosPropiosSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos
