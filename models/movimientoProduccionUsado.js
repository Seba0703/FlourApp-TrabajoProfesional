var mongoose = require("mongoose"); //instancio objeto "mongoose"

var movimientoProduccionUsadoSchema = new mongoose.Schema({  
  productoFinalID:		{ type: String },
  productoUsadoID:      { type: String },
  cantidadUsada:   		{ type: Number }
});

exports.movimientoProduccionUsadoModel = mongoose.model('MovimientoProduccionUsado', movimientoProduccionUsadoSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos