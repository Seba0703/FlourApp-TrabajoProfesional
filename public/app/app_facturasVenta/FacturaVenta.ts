import { Cliente } from '../app_clientes/cliente';
import { Producto } from './Producto';
import {CommonFunctions} from "../app_produccion/common-functions";
import {Vencimiento} from "./Vencimiento";

export class FacturaVenta {
	public condPagoParsed?: string[];
	public errorMsj?: string;
	public redondeoDiff?: number = 0;
    constructor(
        public _id?: string,
        public fecha?: Date,
        public cliente?: Cliente,
        public condicionDePago?: string,
        public nombreListaDePrecios?: string,
        public productos?: Producto[],
		public vencimientos?: Vencimiento[]
        ){
	    	if(fecha) {
	    		this.fecha = fecha
	    	} else {
	    		this.fecha = new Date();
	    	}

	    	if(cliente) {
	    		this.cliente = cliente
	    	} else {
	    		this.cliente = new Cliente();
	    	}

	    	if(productos) { 
	    		this.productos = productos
	    	} else {
	    		this.productos = []
	    	}

	    	if(vencimientos) {
	    		this.vencimientos = vencimientos;
	    		this.calculateDiff();
			} else {
	    		this.vencimientos = [];
			}
    }

    //si cambia el total o la condicion de pago tienen que cambiar los importes del vencimiento
    setImportesEnVencimientos() {
		this.condPagoParsed = this.condicionDePago.split("-");
		var importe = this.getImporte();
		var cantCondPagos = this.condPagoParsed.length;
		var importeCondPago = CommonFunctions.round(importe / cantCondPagos, 2);
		var total: number = 0;


		for(var i = 0; i < this.condPagoParsed.length; i++ ) {
			var vencimiento: Vencimiento = this.vencimientos[i];
			total += importeCondPago;
			if (vencimiento) {
				vencimiento.importe = importeCondPago;
				vencimiento.fecha = this.getFechaVencConPago(Number(this.condPagoParsed[i]));
			} else {
				var vencimiento: Vencimiento = new Vencimiento();
				vencimiento.importe = importeCondPago;
				vencimiento.cobrado = false;
				vencimiento.factura_id = this._id;
				vencimiento.fecha = this.getFechaVencConPago(Number(this.condPagoParsed[i]));
				this.vencimientos.push(vencimiento);
			}
		}

		this.redondeoDiff = CommonFunctions.round(importe - CommonFunctions.round(total, 2), 2);
	}

    getImporte(): number {
	    let total: number = 0
	    for (let productoSeleccionado of this.productos){
	      total += (productoSeleccionado.cantidad * (productoSeleccionado.precioVenta + productoSeleccionado.precioVenta * productoSeleccionado.iva/100))
	    }

	    return Math.round(total * 100) / 100;
    }

	getFechaVencConPago(condPagos: number): string {
		if (condPagos) {
			var someDate = new Date();
			someDate.setDate( this.fecha.getDate() + Number(condPagos) );

			return someDate.getDate() + '/'+ someDate.getMonth() + '/'+ someDate.getFullYear();
		}

		return null;
	}

	isControlTotal_OK(): boolean {
		var total: number = 0;
        for (var i = 0; i < this.vencimientos.length; i++) {
			total += this.vencimientos[i].importe;
		}

		var totalFactura = this.getImporte();
        var totalRound = CommonFunctions.round(total, 2);
		if ( Math.abs(this.redondeoDiff) > 1) {
			this.errorMsj = 'El total de los importes de vencimientos es ' + totalRound + ' y el importe de la factura es de ' + totalFactura;
			alert(this.errorMsj);
        	return false;
		}
		return true;
	}

	calculateDiff() {
		var totalVencimiento: number = 0;
		var totalImporte = this.getImporte();
		for(var i = 0; i < this.vencimientos.length; i++) {
			totalVencimiento += this.vencimientos[i].importe;
		}

		this.redondeoDiff = CommonFunctions.round(totalImporte - CommonFunctions.round(totalVencimiento, 2), 2);
	}

}