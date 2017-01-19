var mongoose = require("mongoose"); //instancio objeto "mongoose"

var materiaPrimaSchema = new mongoose.Schema({  
  cantidad: 		{ type: Number },
  unidad:   		{ type: String },
  stockMin: 		{ type: Number },
  stockMax: 		{ type: Number },
  precioVenta: 		{ type: Number },
  tipo:     		{ type: String },
  porcentajeMerma: 	{ type: Number }
});

exports.materiaPrimaModel = mongoose.model('MateriaPrima', materiaPrimaSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos