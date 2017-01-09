var mongoose = require("mongoose"); //instancio objeto "mongoose"

var condicionDePagoSchema = new mongoose.Schema({  
  nombre:			{ type: String },
  tiempo:  	  		{ type: String }
});

exports.condicionDePagoModel = mongoose.model('CondicionDePago', condicionDePagoSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos