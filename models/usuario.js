var mongoose = require("mongoose"); //instancio objeto "mongoose"

var usuarioSchema = new mongoose.Schema({  
  contrasenia:	 { type: String },
  permisos:   	 { type: Array  },
  nombre: 		 { type: String }
});

exports.usuarioModel = mongoose.model('Usuario', usuarioSchema); //crea el modelo y lo exporta para que lo puedan usar otros modulos