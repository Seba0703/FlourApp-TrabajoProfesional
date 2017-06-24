var mongoose = require("mongoose"); //instancio objeto "mongoose"
var Schema = mongoose.Schema;

var retencionFacturaSchema = new Schema({
    retencion_id:           { type: Schema.Types.ObjectId, ref: 'Retencion'},
    importe:                 { type: Number}

});

exports.retencionFacturaModel = mongoose.model('RetencionFactura', retencionFacturaSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos

