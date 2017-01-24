var mongoose = require("mongoose"); //instancio objeto "mongoose"
var Schema = mongoose.Schema;

var movimientoProduccionFinalSchema = new Schema({  
  materiaPrimaUsada:      { type: Schema.Types.ObjectId, ref: 'MateriaPrima' },
  prodSemiUsado:      { type: Schema.Types.ObjectId, ref: 'ProductSemiProcesado' },
  prodTermUsado:      { type: Schema.Types.ObjectId, ref: 'ProductoTerminado' },
  tipo:				   	{ type: Number },
  fecha:            	{ type: Date },
  cantidadFabricada:   	{ type: Number }
});

exports.movimientoProduccionFinalModel = mongoose.model('MovimientoProduccionFinal', movimientoProduccionFinalSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos