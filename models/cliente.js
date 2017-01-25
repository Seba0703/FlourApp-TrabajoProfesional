var mongoose = require("mongoose"); //instancio objeto "mongoose"

var clienteSchema = new mongoose.Schema({  
  nombreEmpresa:	 { type: String },
  cuit:   	  		 { type: Number },
  categoriaFiscal: 	 { type: String },
  listaPrecioID: 	 { type: String },
  direccion: 	  	 { type: String },
  condicionPago: 	 { type: String }
});

exports.clienteModel = mongoose.model('Cliente', clienteSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos