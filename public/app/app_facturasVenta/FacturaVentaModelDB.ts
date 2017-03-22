/*import { Cliente } from '../app_clientes/cliente';
import { Producto } from './Producto';*/

export class FacturaVentaModelDB {
    constructor(
      public _id?: string,
	  public puntoDeVenta?:         number,
	  public tipoFactura?:          string,
	  public numeroFactura?:        number,
	  public fechaEmision?:   	    Date,
	  public comprobanteReferencia?:number,
	  public clienteID?:    	  		  string,
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