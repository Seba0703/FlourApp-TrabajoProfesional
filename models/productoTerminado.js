var mongoose = require("mongoose"); //instancio objeto "mongoose"

var productoTerminadoSchema = new mongoose.Schema({
  tasaImpositivaID:		{ type: String },
  nombre:            	{ type: String },
  cantidad:   	  		{ type: Number },
  unidad:				{ type: String },
  stockMin: 	  		{ type: Number },
  stockMax: 	  		{ type: Number },
  embolsadoCantDefault: { type: Number },
  porcentajeMerma: 		{ type: Number },
  tipo:     	  		{ type: String },
  precioVenta:			{ type: Number }
  //Se relaciona con listaPorcentajesSchema se inserta en esa tabla este ID y los de los productos con los q se genera este Producto
});

exports.productoTerminadoModel = mongoose.model('ProductoTerminado', productoTerminadoSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos