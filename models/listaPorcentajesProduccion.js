var mongoose = require("mongoose"); //instancio objeto "mongoose"

var listaPorcentajesProduccionSchema = new mongoose.Schema({  
  productoAFabricarID:	{ type: String },
  productoNecesarioID:				{ type: String},
  porcentajeNecesario:				{ type: Number }
});

exports.listaPorcentajesProduccionModel = mongoose.model('listaPorcentajesProduccion', listaPorcentajesProduccionSchema ); //crea el modelo y lo exporta para que lo puedan usar otros modulos



/*productoAFabricarID  productoNecesarioID  porcentaje
		5						2				50
		5						6				50
		9*/