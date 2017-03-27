var mongoose = require("mongoose"); //instancio objeto "mongoose"
var Schema = mongoose.Schema;

var facturaItemSchema = new mongoose.Schema({
  tipo:     	  	{ type: String },
  nombre:           { type: String },
  cantidad:         { type: Number },
  precio:         	{ type: Number },
  iva:         		{ type: Number },
  facturaID:  	{ type: Schema.Types.ObjectId, ref: 'FacturaVenta'}
});

exports.facturaItemModel = mongoose.model('FacturaItem', facturaItemSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos
