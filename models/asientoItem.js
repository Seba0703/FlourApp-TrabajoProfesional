var mongoose = require("mongoose"); //instancio objeto "mongoose"

var asientoItemSchema = new mongoose.Schema({  
  productoID:			{ type: String },
  precio:   	  		{ type: Number },
  fechaVto:				{ type: Date   },
  organizacionID: 	  	{ type: String },
  tipoAsiento: 	  		{ type: String },
  transaccionID: 		{ type: String }
});

exports.asientoItemModel = mongoose.model('AsientoItem', asientoItemSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos