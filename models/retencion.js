var mongoose = require("mongoose"); //instancio objeto "mongoose"
var Schema = mongoose.Schema;
var RangoRetencion  = require("../models/rangoRetencion").rangoRetencionModel;

var retencionSchema = new Schema({
    nombre:                 { type: String},
    codigo:                 { type: String},
    codigoImpositivo:       { type: String},
    rangos_ids:			    [{ type: Schema.Types.ObjectId, ref: 'RangoRetencion', default:[]}]

});

retencionSchema.pre('remove', function(next) {
    // 'this' is the client being removed. Provide callbacks here if you want
    // to be notified of the calls' result.
    RangoRetencion.remove({'_id':{'$in':this.rangos_ids}}).exec();
    next();
});

exports.retencionFacturaModel = mongoose.model('Retencion', retencionSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos
