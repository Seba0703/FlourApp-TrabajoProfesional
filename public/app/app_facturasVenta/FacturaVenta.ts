import { Cliente } from '../app_clientes/cliente';

export class FacturaVenta {
    constructor(
        public _id?: string,
        public nombre?: string,
        public cliente?: Cliente
        ){
    	this.cliente = new Cliente();
    }
}