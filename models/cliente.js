var mongoose = require("mongoose"); //instancio objeto "mongoose"

var clienteSchema = new mongoose.Schema({  
  nombreEmpresa:	 { type: String },
  cuit:   	  		 { type: Number },
  categoriaFiscalID: { type: Number },
  listaPrecioID: 	 { type: Number },
  direccion: 	  	 { type: String },
  condicionPagoID: 	 { type: Number }
});

exports.clienteModel = mongoose.model('Cliente', clienteSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos