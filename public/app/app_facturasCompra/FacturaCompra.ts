import { Proveedor } from '../app_proveedores/proveedor';
import { Producto } from './Producto';

export class FacturaCompra {
    constructor(
        public _id?: string,
        public nombre?: string,
        public proveedor?: Proveedor,
        public productos?: Producto[]
        ){
    	this.proveedor = new Proveedor();
    }
}