var mongoose = require("mongoose"); //instancio objeto "mongoose"

var proveedorSchema = new mongoose.Schema({
  clienteID:		 { type: Number },
  nombreEmpresa:	 { type: String },
  cuit:   	  		 { type: Number },
  categoriaFiscalID: { type: Number },
  listaPrecioID: 	 { type: Number },
  direccion: 	  	 { type: String },
  condicionPagoID: 	 { type: Number }
});

exports.proveedorModel = mongoose.model('Proveedor', proveedorSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos