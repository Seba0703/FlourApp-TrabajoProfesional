var mongoose = require("mongoose"); //instancio objeto "mongoose"

var listaDePreciosSchema = new mongoose.Schema({  
  productoID:			{ type: Number },
  precio:   	  		{ type: Number }
});

exports.listaDePreciosModel = mongoose.model('ListaDePrecios', listaDePreciosSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos