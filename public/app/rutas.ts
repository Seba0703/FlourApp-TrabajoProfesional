let ip = "localhost";
let puerto = 3000;

//VIEWs
export const URL_VIEW_INDEX = 			'http://' + ip + ':' + puerto + '/index.html';
export const URL_VIEW_HOME = 			'http://' + ip + ':' + puerto + '/home.html';
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
export const URL_MOV_PROD_FINAL_SIN_AFECTAR_STOCK = 		'http://' + ip + ':' + puerto + '/api/movProductoFinal/sinAfectar';
export const URL_MOV_PROD_USADO = 		'http://' + ip + ':' + puerto + '/api/movProductoUsado';
export const URL_MOV_PROD_USADO_FINAL = 'http://' + ip + ':' + puerto + '/api/movProductoUsadoFinal';
export const URL_USUARIOS = 'http://' + ip + ':' + puerto + '/api/usuarios';
export const URL_LISTA_PRECIOS = 		'http://' + ip + ':' + puerto + '/api/listaPrecios';
export const URL_LISTA_PRECIOS_LISTNAME = 		'http://' + ip + ':' + puerto + '/api/listaPrecios/list';
export const URL_LISTA_PORCENTAJES = 		'http://' + ip + ':' + puerto + '/api/listaPorcentajes';
export const URL_LISTA_PORCENTAJES_LIST_PROD_FAB = 		'http://' + ip + ':' + puerto + '/api/listaPorcentajes/productoList';
export const URL_LISTA_PORCENTAJES_CON_DATOS = 'http://' + ip + ':' + puerto + '/api/listaPorcentajes/conDatos';
export const URL_INFORMECOMPRAS = 		'http://' + ip + ':' + puerto + '/api/informeCompras';
export const URL_INFORMEVENTAS = 		'http://' + ip + ':' + puerto + '/api/informeVentas';
