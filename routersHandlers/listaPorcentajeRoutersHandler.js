// Import controller
var listaPorcentajeController = require("../controllers/listaPorcentajeController");

exports.getListaPorcentajeRoutersHandler = function(express){
	var listaPorcentajeRoutersHandler = express.Router();

	listaPorcentajeRoutersHandler.route('/listaPorcentajes')  
	  .get(listaPorcentajeController.findAll)
	  .post(listaPorcentajeController.add);

	listaPorcentajeRoutersHandler.route('/listaPorcentajes/:id')  
	  .get(listaPorcentajeController.findById)
	  .put(listaPorcentajeController.update)
	  .delete(listaPorcentajeController.delete);

	listaPorcentajeRoutersHandler.route('/listaPorcentajes/productoList/:productoAfabricarID')  
	  .get(listaPorcentajeController.findByProductoAfabricarID)
	  .delete(listaPorcentajeController.deleteList);
	  
	return listaPorcentajeRoutersHandler;  
}