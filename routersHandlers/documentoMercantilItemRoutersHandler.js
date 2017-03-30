// Import controller
var documentoMercantilItemController = require("../controllers/documentoMercantilItemController");

exports.getDocumentoMercantilItemRoutersHandler = function(express){
	var documentoMercantilItemRoutersHandler = express.Router();

	documentoMercantilItemRoutersHandler.route('/documentosMercantilesItems')
	  .post(documentoMercantilItemController.add);

	documentoMercantilItemRoutersHandler.route('/documentosMercantilesItems/:id')
	  	.put(documentoMercantilItemController.update)
		.delete(documentoMercantilItemController.delete);

	documentoMercantilItemRoutersHandler.route('/documentosMercantilesItems/documentoMercantil/:id')
	  .get(documentoMercantilItemController.findBydocumentoMercantilId);

	return documentoMercantilItemRoutersHandler;
}
