var mongoose = require("mongoose"); //instancio objeto "mongoose"

var transaccionSchema = new mongoose.Schema({  
  organizacionID:		{ type: String },
  fecha:   	  			{ type: Date   },
  condicionPagoID:		{ type: String },
  listaPrecioID: 	  	{ type: String },
  numeroComprobante: 	{ type: Number }
});

exports.transaccionModel = mongoose.model('Transaccion', transaccionSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos