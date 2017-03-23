// Import controller
var facturacionDatosPropiosController = require("../controllers/facturacionDatosPropiosController");

exports.getFacturacionDatosPropiosRoutersHandler = function(express){
	var facturacionDatosPropiosRoutersHandler = express.Router();

	facturacionDatosPropiosRoutersHandler.route('/facturacionDatosPropios')
	  .get(facturacionDatosPropiosController.findAll)
	  .post(facturacionDatosPropiosController.add);

	return facturacionDatosPropiosRoutersHandler;
}
