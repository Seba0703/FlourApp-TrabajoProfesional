// Import controller
var semiProcesadoController = require("../controllers/semiProcesadoController");

exports.getSemiProcesadoRoutersHandler = function(express){
	var semiProcesadoRoutersHandler = express.Router();

	semiProcesadoRoutersHandler.route('/semiProcesados')  
	  .get(semiProcesadoController.findAll)
	  .post(semiProcesadoController.add);

	semiProcesadoRoutersHandler.route('/semiProcesados/:id')  
	  .get(semiProcesadoController.findById)
	  .put(semiProcesadoController.update)
	  .delete(semiProcesadoController.delete);
	  
	semiProcesadoRoutersHandler.route('/semiProcesadosStock')  
	  .get(semiProcesadoController.canUpdateStock)
	  .put(semiProcesadoController.updateStock)
	  
	return semiProcesadoRoutersHandler;  
}