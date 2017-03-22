import { Cliente } from '../app_clientes/cliente';
import { Producto } from './Producto';

export class FacturaVenta {
    constructor(
        public _id?: string,
        public fecha?: Date,
        public cliente?: Cliente,
        public productos?: Producto[]
        ){
    	this.fecha = new Date();
    	this.cliente = new Cliente();
    }
}