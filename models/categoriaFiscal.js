var mongoose = require("mongoose"); //instancio objeto "mongoose"

var categoriaFiscalSchema = new mongoose.Schema({  
  nombre:			{ type: String }
});

exports.categoriaFiscalModel = mongoose.model('CategoriaFiscal', categoriaFiscalSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos