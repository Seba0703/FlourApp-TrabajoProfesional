export class FacturaVentaModelDB {
    constructor(
      public _id?: string,
      public tipo?: 				string, /*tipo: Compra o Venta*/
	  public puntoDeVenta?:         number,
	  public tipoFactura?:          string, /*tipoFactura: A, B o C*/
	  public numeroFactura?:        number,
	  public fechaEmision?:   	    Date,
	  public comprobanteReferencia?:number,
	  public empresaID?:    	  	string,
      public condicionPago?: 	 	string,
  	  public listaPrecioNombre?: 	string,
	  public retencionIG?: 	  		 number,
	  public retencionIVA?: 	  		number,
	  public retencionIB?: 	  		  number,
	  public impuestosInternos?: 	  number,
	  public impuestosMunicipales?: number,
	  public CAI?:                  number,
	  public fechaVtoCAI?:   	      Date
        ){
    }
}