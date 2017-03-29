// Import controller
var facturaController = require("../controllers/facturaController");

exports.getFacturaRoutersHandler = function(express){
	var facturaRoutersHandler = express.Router();

	facturaRoutersHandler.route('/facturas')
	  .get(facturaController.findAll)
	  .post(facturaController.add);

	facturaRoutersHandler.route('/facturas/:id')
	  .get(facturaController.findById)
	  .put(facturaController.update)
	  .delete(facturaController.delete);

	facturaRoutersHandler.route('/facturas/porTipo/:tipo')
	  .get(facturaController.findByTipo);

	return facturaRoutersHandler;
}
