// Import controller
var movProductoUsadoController = require("../controllers/movProductoUsadoController");

exports.getMovProductoUsadoRoutersHandler = function(express){
	var movProductoUsadoRoutersHandler = express.Router();

	movProductoUsadoRoutersHandler.route('/movProductoUsado')  
	  .get(movProductoUsadoController.findAll)
	  .post(movProductoUsadoController.add);

	movProductoUsadoRoutersHandler.route('/movProductoUsado/:id')  
	  .get(movProductoUsadoController.findById)
	  .put(movProductoUsadoController.update)
	  .delete(movProductoUsadoController.delete);
	  
	movProductoUsadoRoutersHandler.route('/movProductoUsadoFinal/:id')  
	  .get(movProductoUsadoController.findByProductoFinal_id)
	  .delete(movProductoUsadoController.deleteMany);
	
	  
	return movProductoUsadoRoutersHandler;  
}