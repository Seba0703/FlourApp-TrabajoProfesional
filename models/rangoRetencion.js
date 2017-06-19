var mongoose = require("mongoose"); //instancio objeto "mongoose"
var Schema = mongoose.Schema;

var rangoRetencionSchema = new Schema({
    desde:          { type: Number },
    hasta:          { type: Number },
    porcentaje:     { type: Number },
    importeFijo:	{ type: Number }

});

exports.rangoRetencionModel = mongoose.model('RangoRetencion', rangoRetencionSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos
