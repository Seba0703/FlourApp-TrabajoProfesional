import {RangoRetencion} from "./RangoRetencion";
export class Retencion {
    _id?: string = null;
    nombre?: string = null;
    codigo?: string = null;
    codigoImpositivo?: string = null;
    rangos_ids?:RangoRetencion[] = [];
    rangosDelete_ids?: string[] = [];

    constructor(_id?: string, nombre?: string, codigo?: string, codigoImpositivo?: string, rangos_ids?: RangoRetencion[], rangosDelete_ids?: string[]){
        this._id = _id ? _id : null;
        this.nombre = nombre ? nombre : null;
        this.codigo = codigo ? codigo : null;
        this.codigoImpositivo = codigoImpositivo ? codigoImpositivo : null;
        this.rangos_ids = rangos_ids ? rangos_ids : [];
        this.rangosDelete_ids = rangosDelete_ids ? rangosDelete_ids : [];
    };

    static clone(retencion: Retencion): Retencion {
        var newRangos:RangoRetencion[] = [];
        for(var i = 0 ; i < retencion.rangos_ids.length; i++) {
            newRangos.push(RangoRetencion.clone(retencion.rangos_ids[i]));
        }
       return new Retencion(retencion._id, retencion.nombre, retencion.codigo, retencion.codigoImpositivo, newRangos, retencion.rangosDelete_ids);
    }

}