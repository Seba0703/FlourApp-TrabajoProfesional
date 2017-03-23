// Import controller
var facturaItemController = require("../controllers/facturaItemController");

exports.getFacturaItemRoutersHandler = function(express){
	var facturaItemRoutersHandler = express.Router();

	facturaItemRoutersHandler.route('/facturaItems')
	  .post(facturaItemController.add);

	facturaItemRoutersHandler.route('/facturaItems/factura/:id')
	  .get(facturaItemController.findByFacturaId);

	return facturaItemRoutersHandler;
}
