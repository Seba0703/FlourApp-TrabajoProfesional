var mongoose = require("mongoose"); //instancio objeto "mongoose"
var Schema = mongoose.Schema;

var documentoMercantilItemSchema = new mongoose.Schema({
  tipo:     	  			{ type: String },
  productoID: 				{ type: String },
  nombre:           		{ type: String },
  cantidad:         		{ type: Number },
  precio:         			{ type: Number },
  iva:         				{ type: Number },
  documentoMercantilID:  	{ type: mongoose.Schema.ObjectId, ref: 'DocumentoMercantil' }
});

exports.documentoMercantilItemModel = mongoose.model('DocumentoMercantilItem', documentoMercantilItemSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos
