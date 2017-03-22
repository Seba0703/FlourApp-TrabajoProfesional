import { Proveedor } from '../app_proveedores/proveedor';
import { Producto } from './Producto';

export class FacturaCompra {
    constructor(
        public _id?: string,
        public fecha?: Date,
        public proveedor?: Proveedor,
        public productos?: Producto[]
        ){
    	this.fecha = new Date();
    	this.proveedor = new Proveedor();
    }
}