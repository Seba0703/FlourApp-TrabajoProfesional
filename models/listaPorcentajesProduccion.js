var mongoose = require("mongoose"); //instancio objeto "mongoose"

var listaPorcentajesProduccionSchema = new mongoose.Schema({  
  productoSemiProcesadoID:	{ type: String },
  productoID:				{ type: String},
  porcentaje:				{ type: Number }
});

exports.listaPorcentajesProduccionModel = mongoose.model('listaPorcentajesProduccion', listaPorcentajesProduccionSchema ); //crea el modelo y lo exporta para que lo puedan usar otros modulos