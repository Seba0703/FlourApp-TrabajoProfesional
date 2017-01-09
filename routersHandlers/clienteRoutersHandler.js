// Import controller
var clienteController = require("../controllers/cliente");

exports.getClienteRoutersHandler = function(express){
	var clienteRoutersHandler = express.Router();

	clienteRoutersHandler.route('/clientes')  
	  .get(clienteController.findAll)
	  .post(clienteController.add);

	clienteRoutersHandler.route('/clientes/:id')  
	  .get(clienteController.findById)
	  .put(clienteController.update)
	  .delete(clienteController.delete);
	  
	return clienteRoutersHandler;  
}