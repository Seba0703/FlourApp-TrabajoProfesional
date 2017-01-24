var mongoose = require("mongoose"); //instancio objeto "mongoose"

var listaDePreciosSchema = new mongoose.Schema({  
  productoID1:			{ type: mongoose.Schema.ObjectId, ref: 'Mateira' },
  productoID2:			{ type: mongoose.Schema.ObjectId, ref: 'Produc' },
  productoID3:			{ type: mongoose.Schema.ObjectId, ref: 'Produc' },
  precio:   	  		{ type: Number }

});

exports.listaDePreciosModel = mongoose.model('ListaDePrecios', listaDePreciosSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos

