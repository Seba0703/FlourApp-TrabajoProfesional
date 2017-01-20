var mongoose = require("mongoose"); //instancio objeto "mongoose"

var materiaPrimaSchema = new mongoose.Schema({
  nombre:			{ type: String },	
  cantidad: 		{ type: Number },
  unidad:   		{ type: String },
  stockMin: 		{ type: Number },
  stockMax: 		{ type: Number },
  precioVenta: 		{ type: Number },
  tipo:     		{ type: String }
});

exports.materiaPrimaModel = mongoose.model('MateriaPrima', materiaPrimaSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos