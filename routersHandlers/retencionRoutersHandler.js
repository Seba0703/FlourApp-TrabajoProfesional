// Import controller
var retencionController = require("../controllers/retencionController");

exports.getRetencionRoutersHandler = function(express){
    var retencionRoutersHandler = express.Router();

    retencionRoutersHandler.route('/retenciones')
        .get(retencionController.findAll)
        .post(retencionController.add);

    retencionRoutersHandler.route('/retenciones/:id')
        .get(retencionController.findById)
        .put(retencionController.update)
        .delete(retencionController.delete);

    return retencionRoutersHandler;
}