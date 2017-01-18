var mongoose = require("mongoose"); //instancio objeto "mongoose"

var clienteSchema = new mongoose.Schema({  
  nombreEmpresa:	 { type: String },
  cuit:   	  		 { type: Number },
  categoriaFiscalID: { type: String },
  listaPrecioID: 	 { type: String },
  direccion: 	  	 { type: String },
  condicionPagoID: 	 { type: String }
});

exports.clienteModel = mongoose.model('Cliente', clienteSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos