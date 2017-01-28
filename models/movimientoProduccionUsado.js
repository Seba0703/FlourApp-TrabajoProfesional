var mongoose = require("mongoose"); //instancio objeto "mongoose"
var Schema = mongoose.Schema;

var movimientoProduccionUsadoSchema = new Schema({  
  movimientoProduccionFinalID:		{type: String},
  materiaPrimaUsada:      { type: Schema.Types.ObjectId, ref: 'MateriaPrima' },
  prodSemiUsado:      { type: Schema.Types.ObjectId, ref: 'ProductoSemiProcesado' },
  prodTermUsado:      { type: Schema.Types.ObjectId, ref: 'ProductoTerminado' },
  cantidadUsada:   		{ type: Number },
  tipo:					{type: Number}
});

exports.movimientoProduccionUsadoModel = mongoose.model('MovimientoProduccionUsado', movimientoProduccionUsadoSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos