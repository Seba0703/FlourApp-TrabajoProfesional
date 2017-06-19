export class RangoRetencion {
    _id?: string = null;
    desde: number = null;
    hasta: number = null;
    porcentaje: number = null;
    importeFijo: number = null;

    constructor(id?: string, desde?: number, hasta?: number, porcentaje?: number, importeFijo?: number) {
        this._id = id ;
        this.desde = desde;
        this.hasta = hasta;
        this.porcentaje = porcentaje;
        this.importeFijo = importeFijo;
    }

    static clone( rango : RangoRetencion): RangoRetencion {
        return new RangoRetencion(rango._id, rango.desde, rango.hasta, rango.porcentaje, rango.importeFijo);
    }
}