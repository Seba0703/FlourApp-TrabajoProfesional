import {Retencion} from "../app_retenciones/retencion";
export class RetencionFacturaVista {
    _id: string = null;
    importe: number = null;
    retencion_id: Retencion = null;

    constructor(_id?: string, importe?: number, retencion_id?: Retencion) {
        this._id = _id ? _id : null;
        this.retencion_id = retencion_id ? retencion_id : null ;
        this.importe = importe ? importe : 0;
    }
}