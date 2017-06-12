var mongoose = require("mongoose"); //instancio objeto "mongoose"
var Schema = mongoose.Schema;

var documentoMercantilVencimientoSchema = Schema({
    importe:     	  			{ type: Number },
    cobrado:     	  			{ type: Boolean },
    factura_id: 				{ type: Schema.ObjectId, ref: 'DocumentoMercantil' },
    fecha:                      {type: String}
});

exports.documentoMercantilVencimientoModel = mongoose.model('DocumentoMercantilVencimiento', documentoMercantilVencimientoSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos

