var mongoose = require("mongoose"); //instancio objeto "mongoose"

var movimientoProduccionFinalSchema = new mongoose.Schema({  
  productoFinalID:		{ type: String },
  fecha:            	{ type: Date },
  cantidadFabricada:   	{ type: Number }
});

exports.movimientoProduccionFinalModel = mongoose.model('MovimientoProduccionFinal', movimientoProduccionFinalSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos