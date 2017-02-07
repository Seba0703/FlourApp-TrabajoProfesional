// Import controller
var movProductoFinalController = require("../controllers/movProductoFinalController");

exports.getMovProductoFinalRoutersHandler = function(express){
	var movProductoFinalRoutersHandler = express.Router();

	movProductoFinalRoutersHandler.route('/movProductoFinal')  
	  .get(movProductoFinalController.findAll)
	  .post(movProductoFinalController.add);

	movProductoFinalRoutersHandler.route('/movProductoFinal/:id')  
	  .get(movProductoFinalController.findById)
	  .put(movProductoFinalController.update)
	  .delete(movProductoFinalController.delete);
	
	movProductoFinalRoutersHandler.route('/movProductoFinal/sinAfectar/:id')
	  .delete(movProductoFinalController.deleteSinAfectarStock);
	  
	return movProductoFinalRoutersHandler;  
}