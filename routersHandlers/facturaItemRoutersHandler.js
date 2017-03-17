// Import controller
var facturaItemController = require("../controllers/facturaItemController");

exports.getFacturaItemRoutersHandler = function(express){
	var facturaItemRoutersHandler = express.Router();

	facturaItemRoutersHandler.route('/facturaItems')
	  .get(facturaItemController.findAll)
	  .post(facturaItemController.add);

	facturaItemRoutersHandler.route('/facturaItems/:id')
	  .get(facturaItemController.findById)
	  .put(facturaItemController.update)
	  .delete(facturaItemController.delete);

	return facturaItemRoutersHandler;
}
