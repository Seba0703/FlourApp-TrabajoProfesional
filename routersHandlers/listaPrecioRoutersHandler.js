// Import controller
var listaPrecioController = require("../controllers/listaPrecioController");

exports.getListaPrecioRoutersHandler = function(express){
	var listaPrecioRoutersHandler = express.Router();

	listaPrecioRoutersHandler.route('/listaPrecios')  
	  .get(listaPrecioController.findAll)
	  .post(listaPrecioController.add);

	listaPrecioRoutersHandler.route('/listaPrecios/list/:name')  
	  .put(listaPrecioController.updateListName)
	  .delete(listaPrecioController.deleteList);

	listaPrecioRoutersHandler.route('/listaPrecios/:id')  
	  .get(listaPrecioController.findById)
	  .put(listaPrecioController.update)
	  .delete(listaPrecioController.delete);


	  
	return listaPrecioRoutersHandler;  
}