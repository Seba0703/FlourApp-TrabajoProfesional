// Import controller
var productoTerminadoController = require("../controllers/productoTerminadoController");

exports.getProductoTerminadoRoutersHandler = function(express){
	var productoTerminadoRoutersHandler = express.Router();

	productoTerminadoRoutersHandler.route('/productosTerminados')  
	  .get(productoTerminadoController.findAll)
	  .post(productoTerminadoController.add);

	productoTerminadoRoutersHandler.route('/productosTerminados/:id')  
	  .get(productoTerminadoController.findById)
	  .put(productoTerminadoController.update)
	  .delete(productoTerminadoController.delete);
	  
	return productoTerminadoRoutersHandler;  
}