// Import controller
var documentoMercantilController = require("../controllers/documentoMercantilController");

exports.getDocumentoMercantilRoutersHandler = function(express){
	var documentoMercantilRoutersHandler = express.Router();

	documentoMercantilRoutersHandler.route('/documentosMercantiles')
	  .get(documentoMercantilController.findAll)
	  .post(documentoMercantilController.add);

	documentoMercantilRoutersHandler.route('/documentosMercantiles/facturas')
		  .get(documentoMercantilController.findFiltered);

	documentoMercantilRoutersHandler.route('/documentosMercantiles/:id')
	  .get(documentoMercantilController.findById)
	  .put(documentoMercantilController.update)
	  .delete(documentoMercantilController.delete);

	documentoMercantilRoutersHandler.route('/documentosMercantiles/porTipo/:tipo')
	  .get(documentoMercantilController.findByTipo);

	return documentoMercantilRoutersHandler;
}
