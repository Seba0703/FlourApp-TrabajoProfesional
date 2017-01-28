let ip = "localhost";
let puerto = 3000;

//VIEWs
export const URL_VIEW_INDEX = 			'http://' + ip + ':' + puerto + '/index.html';
export const URL_VIEW_CLIENTES =		'http://' + ip + ':' + puerto + '/clientes.html';

//API 
export const URL_CLIENTES = 			'http://' + ip + ':' + puerto + '/api/clientes';
export const URL_PROVEEDORES = 			'http://' + ip + ':' + puerto + '/api/proveedores';
export const URL_MATERIAS_PRIMA = 		'http://' + ip + ':' + puerto + '/api/materiasPrima';
export const URL_SEMIPROCESADOS = 		'http://' + ip + ':' + puerto + '/api/semiProcesados';
export const URL_PRODUCTOS_TERMINADOS = 'http://' + ip + ':' + puerto + '/api/productosTerminados';
export const URL_MATERIAS_PRIMA_STOCK = 		'http://' + ip + ':' + puerto + '/api/materiasPrimaStock';
export const URL_SEMIPROCESADOS_STOCK = 		'http://' + ip + ':' + puerto + '/api/semiProcesadosStock';
export const URL_PRODUCTOS_TERMINADOS_STOCK = 'http://' + ip + ':' + puerto + '/api/productosTerminadosStock';
export const URL_MOV_PROD_FINAL = 		'http://' + ip + ':' + puerto + '/api/movProductoFinal';
export const URL_MOV_PROD_USADO = 		'http://' + ip + ':' + puerto + '/api/movProductoUsadoFinal';
export const URL_USUARIOS = 			'http://' + ip + ':' + puerto + '/api/usuarios';