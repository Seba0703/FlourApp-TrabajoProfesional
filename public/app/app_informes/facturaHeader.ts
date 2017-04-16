export class FacturaHeader {
    constructor(
        public numero: number,
        public contraparte: string,
        public categ_fiscal: string,
        public cond_pago: string,
        public iva: number
        ){}
}
