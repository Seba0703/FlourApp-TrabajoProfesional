var mongoose = require("mongoose"); //instancio objeto "mongoose"

var listaPorcentajesProduccionSchema = new mongoose.Schema({  
  productoSemiProcesadoID:	{ type: Number },
  productoID:				{type: Number},
  porcentaje:				{ type: Number }
});

exports.productoSemiProcesadoModel = mongoose.model('ProductoSemiProcesado', productoSemiProcesadoSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos