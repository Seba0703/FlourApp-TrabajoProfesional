// Import controller
var productosController = require("../controllers/productosController");

exports.getInformePreciosRoutersHandler = function(express){
	var informePreciosRoutersHandler = express.Router();

	// informePreciosRoutersHandler.route('/informePrecios')
	//   .get(productosController.ultimosPreciosProducto);

	informePreciosRoutersHandler.route('/informePrecios/:id')
	  .get(productosController.ultimosPreciosProducto);

	return informePreciosRoutersHandler;
}
