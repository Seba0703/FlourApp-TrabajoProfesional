// Import controller
var usuarioController = require("../controllers/usuarioController");

exports.getUsuarioRoutersHandler = function(express){
	var usuarioRoutersHandler = express.Router();

	usuarioRoutersHandler.route('/usuarios')  
	  .get(usuarioController.findAll)
	  .post(usuarioController.add);

	usuarioRoutersHandler.route('/usuarios/:id')  
	  .get(usuarioController.findById)
	  .put(usuarioController.update)
	  .delete(usuarioController.delete);
	  
	return usuarioRoutersHandler;  
}