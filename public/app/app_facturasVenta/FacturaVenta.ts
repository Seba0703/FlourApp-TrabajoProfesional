import { Cliente } from '../app_clientes/cliente';
import { Producto } from './Producto';

export class FacturaVenta {
    constructor(
        public _id?: string,
        public fecha?: Date,
        public cliente?: Cliente,
        public productos?: Producto[]
        ){
	    	if(fecha) {
	    		this.fecha = fecha
	    	} else {
	    		this.fecha = new Date();
	    	}

	    	if(cliente) {
	    		this.cliente = cliente
	    	} else {
	    		this.cliente = new Cliente();
	    	}

	    	if(productos) { 
	    		this.productos = productos
	    	} else {
	    		this.productos = []
	    	}
    }

    getImporte(): number {
	    let total: number = 0
	    for (let productoSeleccionado of this.productos){
	      total += (productoSeleccionado.cantidad * (productoSeleccionado.precioVenta + productoSeleccionado.precioVenta * productoSeleccionado.iva/100))
	    }

	    return Math.round(total * 100) / 100;
    }
}