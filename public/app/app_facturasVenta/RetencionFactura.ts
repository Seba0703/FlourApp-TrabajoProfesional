import {Retencion} from "../app_retenciones/retencion";
export class RetencionFactura {
    importe: number = null;
    origen_id: string = null;
    retencion_id: Retencion = null;
    esCliente: boolean  = false;

    constructor( importe?: number, retencion_id?: Retencion, origen_id?: string, esCliente?: boolean) {
        this.esCliente = esCliente ? esCliente : false;
        this.origen_id = origen_id ? origen_id : null;
        this.importe = importe ? importe : 0;
        this.retencion_id = retencion_id ? retencion_id : null;
    }

    static clone( retencionFactura : RetencionFactura): RetencionFactura {
        return new RetencionFactura(retencionFactura.importe, retencionFactura.retencion_id, retencionFactura.origen_id);
    }
}