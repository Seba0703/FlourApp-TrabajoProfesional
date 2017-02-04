var mongoose = require("mongoose"); //instancio objeto "mongoose"
var Schema = mongoose.Schema;

var listaPorcentajesProduccionSchema = Schema({  
  productoAFabricarID:		{ type: String },
  productoNecesarioID:		{ type: String},
  productoNecesarioIDPrima:	{ type: Schema.Types.ObjectId, ref: 'MateriaPrima'},
  productoNecesarioIDSemi:	{ type: Schema.Types.ObjectId, ref: 'ProductoSemiProcesado' },
  productoNecesarioIDTerm:	{ type: Schema.Types.ObjectId, ref: 'ProductoTerminado'  },
  tipoNecesario:			{ type: Number },
  tipoAFabricar:			{ type: Number },
  porcentajeNecesario:		{ type: Number }
});

exports.listaPorcentajesProduccionModel = mongoose.model('listaPorcentajesProduccion', listaPorcentajesProduccionSchema ); //crea el modelo y lo exporta para que lo puedan usar otros modulos



/*productoAFabricarID  productoNecesarioID  porcentaje
		5						2				50
		5						6				50
		9*/