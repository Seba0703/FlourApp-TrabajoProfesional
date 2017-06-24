var mongoose = require("mongoose"); //instancio objeto "mongoose"

var clienteSchema = new mongoose.Schema({  
  nombreEmpresa:	 { type: String },
  cuit:   	  		 { type: Number },
  categoriaFiscal: 	 { type: String },
  listaPrecioNombre: { type: String },
  direccion: 	  	 { type: String },
  condicionPago: 	 { type: String },
  retenciones_ids:	[{ type: mongoose.Schema.Types.ObjectId, ref: 'Retencion', default:[]}]
});

exports.clienteModel = mongoose.model('Cliente', clienteSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos