var mongoose = require("mongoose"); //instancio objeto "mongoose"

var listaDePreciosSchema = new mongoose.Schema({
  nombre: 				{ type: String},
  mp_ID:			{ type: mongoose.Schema.ObjectId, ref: 'MateriaPrima' },
  sp_ID:			{ type: mongoose.Schema.ObjectId, ref: 'ProductoSemiProcesado' },
  pt_ID:			{ type: mongoose.Schema.ObjectId, ref: 'ProductoTerminado' },
  precio:   	  		{ type: Number }
});

exports.listaDePreciosModel = mongoose.model('ListaDePrecios', listaDePreciosSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos

