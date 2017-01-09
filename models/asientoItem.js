var mongoose = require("mongoose"); //instancio objeto "mongoose"

var asientoItemSchema = new mongoose.Schema({  
  productoID:			{ type: Number },
  precio:   	  		{ type: Number },
  fechaVto:				{ type: Date   },
  organizacionID: 	  	{ type: Number },
  tipoAsiento: 	  		{ type: String },
  transaccionID: 		{ type: Number }
});

exports.asientoItemModel = mongoose.model('AsientoItem', asientoItemSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos