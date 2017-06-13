// Import controller
var documentoMercantilVencimientoController = require("../controllers/documentoMercantilVencimientoController");

exports.getDocumentoMercantilItemRoutersHandler = function(express){
    var documentoMercantilItemRoutersHandler = express.Router();

    documentoMercantilItemRoutersHandler.route('/documentosMercantilesVencimientos')
        .post(documentoMercantilVencimientoController.add);

    documentoMercantilItemRoutersHandler.route('/documentosMercantilesVencimientos/:id')
        .put(documentoMercantilVencimientoController.update)
        .delete(documentoMercantilVencimientoController.delete);

    documentoMercantilItemRoutersHandler.route('/documentosMercantilesVencimientos/documentoMercantil/:id')
        .get(documentoMercantilVencimientoController.findBydocumentoMercantilId);

    return documentoMercantilItemRoutersHandler;
}