export class RangoRetencion {
    _id?: string = null;
    desde: number = null;
    hasta: number = null;
    porcentaje: number = null;
    importeFijo: number = null;

    constructor(id?: string, desde?: number, hasta?: number, porcentaje?: number, importeFijo?: number) {
        this._id = id ? id : null ;
        this.desde = desde ? desde : null;
        this.hasta = hasta ? hasta: null;
        this.porcentaje = porcentaje ? porcentaje : null;
        this.importeFijo = importeFijo ? importeFijo : null;
    }

    static clone( rango : RangoRetencion): RangoRetencion {
        return new RangoRetencion(rango._id, rango.desde, rango.hasta, rango.porcentaje, rango.importeFijo);
    }
}