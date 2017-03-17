var mongoose = require("mongoose"); //instancio objeto "mongoose"

var facturaItem = new mongoose.Schema({
  tipo:     	  		{ type: String },
  nombre:           { type: String },
  cantidad:         { type: Number },
  numeroFactura:    { type: Number }
});

exports.facturaItemModel = mongoose.model('FacturaItem', facturaItemSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos
