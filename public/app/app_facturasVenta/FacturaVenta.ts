import { Cliente } from '../app_clientes/cliente';
import { Producto } from './Producto';

export class FacturaVenta {
    constructor(
        public _id?: string,
        public nombre?: string,
        public cliente?: Cliente,
        public productos?: Producto[]
        ){
    	this.cliente = new Cliente();
    }
}