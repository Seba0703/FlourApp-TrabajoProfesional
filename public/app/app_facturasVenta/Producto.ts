export class Producto {
    constructor(
        public _id?: string,
        public tipo?: string,
        public nombre?: string,
        public cantidad?: number,
        public precioVenta?: number,
        public iva?: number
        ){
    }
}