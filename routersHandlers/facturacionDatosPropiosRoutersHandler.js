// Import controller
var facturacionDatosPropiosController = require("../controllers/facturacionDatosPropiosController");

exports.getFacturacionDatosPropiosRoutersHandler = function(express){
	var facturacionDatosPropiosRoutersHandler = express.Router();

	facturacionDatosPropiosRoutersHandler.route('/facturacionDatosPropioss')
	  .get(facturacionDatosPropiosController.findAll)
	  .post(facturacionDatosPropiosController.add);

/*	facturacionDatosPropiosRoutersHandler.route('/facturacionDatosPropioss/:id')
	  .get(facturacionDatosPropiosController.findById)
	  .put(facturacionDatosPropiosController.update)
	  .delete(facturacionDatosPropiosController.delete);
*/
	return facturacionDatosPropiosRoutersHandler;
}
