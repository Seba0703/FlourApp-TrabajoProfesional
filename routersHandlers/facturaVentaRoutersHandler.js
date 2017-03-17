// Import controller
var facturaVentaController = require("../controllers/facturaVentaController");

exports.getFacturaVentaRoutersHandler = function(express){
	var facturaVentaRoutersHandler = express.Router();

	facturaVentaRoutersHandler.route('/facturaVentas')
	  .get(facturaVentaController.findAll);
	  // .post(facturaVentaController.add);

	facturaVentaRoutersHandler.route('/facturaVentas/:id')
	  .get(facturaVentaController.findById)
	  .put(facturaVentaController.update)
	  .delete(facturaVentaController.delete);

	return facturaVentaRoutersHandler;
}
