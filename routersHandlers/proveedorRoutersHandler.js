// Import controller
var proveedorController = require("../controllers/proveedorController");

exports.getProveedorRoutersHandler = function(express){
	var proveedorRoutersHandler = express.Router();

	proveedorRoutersHandler.route('/proveedores')  
	  .get(proveedorController.findAll)
	  .post(proveedorController.add);

	proveedorRoutersHandler.route('/proveedores/:id')  
	  .get(proveedorController.findById)
	  .put(proveedorController.update)
	  .delete(proveedorController.delete);
	  
	return proveedorRoutersHandler;  
}