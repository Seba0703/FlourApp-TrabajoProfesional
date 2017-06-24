import { Cliente } from '../app_clientes/cliente';
import { Producto } from './Producto';
import {CommonFunctions} from "../app_produccion/common-functions";
import {Vencimiento} from "./Vencimiento";
import {RetencionFactura} from "./RetencionFactura";
import {RangoRetencion} from "../app_retenciones/RangoRetencion";
import {Retencion} from "../app_retenciones/retencion";
import {RetencionFacturaVista} from "./RetencionFacturaVista";

export class FacturaVenta {
	public condPagoParsed?: string[];
	public errorMsj?: string;
	public redondeoDiff?: number = 0;
	public retencionesFacturaHash = {};
	public retencionesFacturaVista?: RetencionFacturaVista[] = [];
	public retencionesDelete_ids: string[] = [];
	public retencionesFactura: RetencionFactura[] = [];
    constructor(
        public _id?: string,
        public fecha?: Date,
        public cliente?: Cliente,
        public condicionDePago?: string,
        public nombreListaDePrecios?: string,
        public productos?: Producto[],
		public vencimientos?: Vencimiento[],
		retencionesFactura_ids?: RetencionFacturaVista[]
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

			if (retencionesFactura_ids) {
	    		this.retencionesFacturaVista = retencionesFactura_ids;
			} else {
	    		this.retencionesFacturaVista = [];
			}
    }

    //si cambia el total o la condicion de pago tienen que cambiar los importes del vencimiento
    setImportesEnVencimientos() {
		this.condPagoParsed = this.condicionDePago.split("-");
		let importe = this.getImporte();
		let cantCondPagos = this.condPagoParsed.length;
		let importeCondPago = CommonFunctions.round(importe / cantCondPagos, 2);
		let total: number = 0;


		for(let i = 0; i < this.condPagoParsed.length; i++ ) {
			let vencimiento: Vencimiento = this.vencimientos[i];
			total += importeCondPago;
			if (vencimiento) {
				vencimiento.importe = importeCondPago;
				vencimiento.fecha = this.getFechaVencConPago(Number(this.condPagoParsed[i]));
			} else {
				let vencimiento: Vencimiento = new Vencimiento();
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
			let someDate = new Date();
			someDate.setDate( this.fecha.getDate() + Number(condPagos) );

			return someDate.getDate() + '/'+ someDate.getMonth() + '/'+ someDate.getFullYear();
		}

		return null;
	}

	isControlTotal_OK(): boolean {
		let total: number = 0;
        for (let i = 0; i < this.vencimientos.length; i++) {
			total += this.vencimientos[i].importe;
		}

		let totalFactura = this.getImporte();
		let totalRound = CommonFunctions.round(total, 2);
		if ( Math.abs(this.redondeoDiff) > 1) {
			this.errorMsj = 'El total de los importes de vencimientos es ' + totalRound + ' y el importe de la factura es de ' + totalFactura;
			alert(this.errorMsj);
        	return false;
		}
		return true;
	}

	calculateDiff() {
		let totalVencimiento: number = 0;
		let totalImporte = this.getImporte();
		for(let i = 0; i < this.vencimientos.length; i++) {
			totalVencimiento += this.vencimientos[i].importe;
		}

		this.redondeoDiff = CommonFunctions.round(totalImporte - CommonFunctions.round(totalVencimiento, 2), 2);
	}

	updateVistaAddRetencionFor(origen_id: string, retenciones_ids: Retencion[], importeAImputar: number, esCliente: boolean) {
		this.addRetencionFor(origen_id, retenciones_ids, importeAImputar, esCliente);
		this.calcularRetencionesVista();
	}

	private addRetencionFor(origen_id: string, retenciones_ids: Retencion[], importeAImputar: number, esCliente: boolean) {
		if (esCliente) {
			this.removeRetencionesFvCliente();
		}

		if (retenciones_ids && retenciones_ids.length > 0) {

			for (let i = 0; i < retenciones_ids.length; i++) {
				let importe: number = 0;

				let rangos: RangoRetencion[] = retenciones_ids[i].rangos_ids;
				if (rangos) {
					let j = 0;
					let encontrado = false;
					while (j < rangos.length && !encontrado) {
						if (rangos[j].desde <= importeAImputar && rangos[j].hasta >= importeAImputar) {
							encontrado = true;
							if (rangos[j].porcentaje && rangos[j].porcentaje != 0) {
								importe = CommonFunctions.round(rangos[j].porcentaje * importeAImputar / 100, 2);
							} else if (rangos[j].importeFijo && rangos[j].importeFijo != 0) {
								importe = rangos[j].importeFijo;
							}
						}

						j++;
					}
				}

				let retencionFactura: RetencionFactura = null;

				if (!esCliente) {
					retencionFactura = this.findRetencionesFactura(retenciones_ids[i]._id, origen_id);
				}
				if (retencionFactura == null) {
					let retencionFactura: RetencionFactura = new RetencionFactura(importe, retenciones_ids[i], origen_id, esCliente);
					this.retencionesFactura.push(retencionFactura);
				} else {
					retencionFactura.importe = importe;
				}

			}
		}
	}

	private findRetencionesFactura(retencion_id: string, origen_id: string): RetencionFactura {
		let i = 0;
		let encontrado = false;
		let retencionFactura: RetencionFactura = null;
		while(i < this.retencionesFactura.length && !encontrado) {
			if (this.retencionesFactura[i].retencion_id._id == retencion_id && this.retencionesFactura[i].origen_id == origen_id) {
				encontrado = true;
				retencionFactura = this.retencionesFactura[i];
			}
			i++;
		}

		return retencionFactura;
	}



	calcularRetencionesVista() {
		this.retencionesFacturaHash = {};

		for(let i = 0; i < this.retencionesFacturaVista.length; i++) {
			this.retencionesDelete_ids.push(this.retencionesFacturaVista[i]._id);
		}

		this.retencionesFacturaVista = [];
		for (let i = 0; i < this.retencionesFactura.length; i++){
			let retencionFacturaVista: RetencionFacturaVista = null;
			if (this.retencionesFactura[i].retencion_id._id in this.retencionesFacturaHash) {
				retencionFacturaVista = this.retencionesFacturaHash[this.retencionesFactura[i].retencion_id._id];
				retencionFacturaVista.importe = CommonFunctions.round(retencionFacturaVista.importe + this.retencionesFactura[i].importe, 2);
			} else {
				retencionFacturaVista = new RetencionFacturaVista(null, this.retencionesFactura[i].importe,this.retencionesFactura[i].retencion_id);
				this.retencionesFacturaHash[this.retencionesFactura[i].retencion_id._id] = retencionFacturaVista;
				this.retencionesFacturaVista.push(retencionFacturaVista);
			}
		}
	}

	recalcularRetencionesForProducto(index: number) {
		let producto: Producto = this.productos[index];
		let importe = (producto.cantidad * (producto.precioVenta + producto.precioVenta * producto.iva/100));
		this.updateVistaAddRetencionFor(producto.mp_sp_pt_ID, producto.retenciones_ids, importe, false);
		this.recalcularRetencionCliente();	//cambia importe -> cambia retenciones cliente
	}

	removeRetencion(_id: string, retenciones_ids: Retencion[]) {
		for (let i = 0; i < retenciones_ids.length; i++) {
			this.removeRetencionesFactura(retenciones_ids[i]._id, _id);
		}

		this.calcularRetencionesVista();
	}

	private removeRetencionesFactura(retencion_id: string, origen_id: string): RetencionFactura {
		let i = 0;
		let encontrado = false;
		let retencionFactura: RetencionFactura = null;
		while(i < this.retencionesFactura.length && !encontrado) {
			if (this.retencionesFactura[i].retencion_id._id == retencion_id && this.retencionesFactura[i].origen_id == origen_id) {
				encontrado = true;
				retencionFactura = this.retencionesFactura.splice(i,1)[0];
			}
			i++;
		}

		return retencionFactura;
	}

	private removeRetencionesFvCliente() {
		let i = 0;
		while(i < this.retencionesFactura.length) {
			if (this.retencionesFactura[i].esCliente) {
				let retencionFactura: RetencionFactura = this.retencionesFactura.splice(i,1)[0];
			}
			i++;
		}
	}

	recalcularRetencionCliente() {
		this.updateVistaAddRetencionFor(this.cliente._id,this.cliente.retenciones_ids,this.getImporte(),true);
	}

	recalcularRetencionAllUpdateVista() {
		for (let productoSeleccionado of this.productos){
			let importe = (productoSeleccionado.cantidad * (productoSeleccionado.precioVenta + productoSeleccionado.precioVenta * productoSeleccionado.iva/100))
			this.updateVistaAddRetencionFor(productoSeleccionado.mp_sp_pt_ID, productoSeleccionado.retenciones_ids, importe, false);
		}
		this.recalcularRetencionCliente();	//cambia importe -> cambia retenciones cliente
	}

	recalcularRetencionAllSinVista(productosDisponibles: Array<any>) {
		for (let productoSeleccionado of this.productos){
			let retenciones_ids = this.getIndex(productosDisponibles,productoSeleccionado.mp_sp_pt_ID);
			let importe = (productoSeleccionado.cantidad * (productoSeleccionado.precioVenta + productoSeleccionado.precioVenta * productoSeleccionado.iva/100))
			this.addRetencionFor(productoSeleccionado.mp_sp_pt_ID, retenciones_ids, importe, false);
		}

		this.addRetencionFor(this.cliente._id,this.cliente.retenciones_ids,this.getImporte(),true);	//cambia importe -> cambia retenciones cliente
	}

	getIndex(productosDisponibles: any, mp_sp_pt_ID: string): any{
		let index = 0;
		for(let productoSeleccionado of productosDisponibles){
			if(mp_sp_pt_ID == productoSeleccionado._id) {
				return productoSeleccionado.retenciones_ids
			}
			index++
		}
	}

	borrarRetencionFactura(index: number) {
		let retencionFacturaVista = this.retencionesFacturaVista.splice(index,1)[0];
		this.retencionesDelete_ids.push(retencionFacturaVista._id);
	}

	getImporteTotalRetenciones(): number {
		let importeTotal: number = 0;
		for(let i = 0; i < this.retencionesFacturaVista.length; i++) {
			importeTotal += this.retencionesFacturaVista[i].importe;
		}

		return CommonFunctions.round(importeTotal,2);
	}

	getImporteTotal(): number {
		return  CommonFunctions.round(this.getImporte() + this.getImporteTotalRetenciones(), 2);
	}
}