import { Proveedor } from '../app_proveedores/proveedor';
import { Producto } from './Producto';

export class FacturaCompra {
    constructor(
        public _id?: string,
        public fecha?: Date,
        public proveedor?: Proveedor,
        public condicionDePago?: string,
        public nombreListaDePrecios?: string,
        public productos?: Producto[]
        ){
	    	if(fecha) {
	    		this.fecha = fecha
	    	} else {
	    		this.fecha = new Date();
	    	}

	    	if(proveedor) {
	    		this.proveedor = proveedor
	    	} else {
	    		this.proveedor = new Proveedor();
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