// Import controller
var productosController = require("../controllers/productosController");

exports.getStockRoutersHandler = function(express){
	var stockRoutersHandler = express.Router();

	stockRoutersHandler.route('/informeEstadoStock')
	  .get(productosController.estadoStock);

	return stockRoutersHandler;
}
