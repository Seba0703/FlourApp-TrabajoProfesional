// Import controller
var materiaPrimaController = require("../controllers/materiaPrimaController");

exports.getMateriaPrimaRoutersHandler = function(express){
	var materiaPrimaRoutersHandler = express.Router();

	materiaPrimaRoutersHandler.route('/materiasPrima')  
	  .get(materiaPrimaController.findAll)
	  .post(materiaPrimaController.add);

	materiaPrimaRoutersHandler.route('/materiasPrima/:id')  
	  .get(materiaPrimaController.findById)
	  .put(materiaPrimaController.update)
	  .delete(materiaPrimaController.delete);
	  
	materiaPrimaRoutersHandler.route('/materiasPrimaStock')  
	  .put(materiaPrimaController.updateStock)
	  
	return materiaPrimaRoutersHandler;  
}