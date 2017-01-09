var mongoose = require("mongoose"); //instancio objeto "mongoose"

var tasaImpositivaSchema = new mongoose.Schema({  
  nombre:			{ type: String },
  porcentaje:  		{ type: Number }
});

exports.tasaImpositivaModel = mongoose.model('TasaImpositiva', tasaImpositivaSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos