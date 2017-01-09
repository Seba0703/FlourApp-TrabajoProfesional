var mongoose = require("mongoose"); //instancio objeto "mongoose"

var productoSemiProcesadoSchema = new mongoose.Schema({  
  tasaImpositivaID:		{ type: Number },
  cantidad:   	  		{ type: Number },
  unidad:				{ type: String },
  stockMin: 	  		{ type: Number },
  stockMax: 	  		{ type: Number },
  embolsadoCantDefault: { type: Number },
  tipo:     	  		{ type: String }
});

exports.productoSemiProcesadoModel = mongoose.model('ProductoSemiProcesado', productoSemiProcesadoSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos