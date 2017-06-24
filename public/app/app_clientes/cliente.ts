import {Retencion} from "../app_retenciones/retencion";
export class Cliente {
    constructor(
        public _id?: string,
        public nombreEmpresa?: string,
        public cuit?: string,
        public listaPrecioNombre?: string,
        public condicionPago?: string,
        public retenciones_ids?: Retencion[]){}
}