var mongoose = require("mongoose"); //instancio objeto "mongoose"
var Schema = mongoose.Schema;

var movimientoProduccionFinalSchema = new Schema({
    materiaPrimaFinal:      { type: Schema.Types.ObjectId, ref: 'MateriaPrima' },
    prodSemiFinal:      { type: Schema.Types.ObjectId, ref: 'ProductoSemiProcesado' },
    prodTermFinal:      { type: Schema.Types.ObjectId, ref: 'ProductoTerminado' },
    tipo:				   	{ type: Number },
    fecha:            	{ type: Date },
    cantidadFabricada:   	{ type: Number }
});

exports.movimientoProduccionFinalModel = mongoose.model('MovimientoProduccionFinal', movimientoProduccionFinalSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos

//5882b1143e194e0dfcd7f716

//5883d094d330ac04e461e5de

//5882c4edab901c10140cd8a2

//5881462636b5211638fb770c