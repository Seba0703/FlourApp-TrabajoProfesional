import { Component, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { RequiredProduct } from './required-product';
import { RequiredProductService } from './required-product.service';
import { ProductService } from './product.service';
import { MovProductService } from '../app_deshacerProduccion/mov-product.service';

import { Producto } from './producto';
import { MovProductoFinal } from '../app_deshacerProduccion/mov-product-final';
import { CommonFunctions } from './common-functions';

@Component({
  selector: 'required-product-detail',
  template: `
	<div *ngIf="requiredProducts" style="overflow-x:auto;">
		<table class="table table-hover table-bordered">
			<thead class="thead-inverse">
			  <tr>
				<th>Productos necesarios</th>
				<th>Stock</th>
				<th>Unidad</th>
				<th>Gasto</th>
				<th>Porcentaje</th>
			  </tr>
			</thead>
			<tbody *ngFor="let requiredProduct of requiredProducts">
				<td [ngClass]= '{red: requiredProduct.changeColor, black: !requiredProduct.changeColor}'>{{requiredProduct.productoNecesario.nombre}}</td>
				<td [ngClass]= '{red: requiredProduct.changeColor, black: !requiredProduct.changeColor}'>{{requiredProduct.productoNecesario.cantidad}}</td>
				<td [ngClass]= '{red: requiredProduct.changeColor, black: !requiredProduct.changeColor}'>{{requiredProduct.productoNecesario.unidad}}</td>
				<td [ngClass]= '{red: requiredProduct.changeColor, black: !requiredProduct.changeColor}'>
					<input [(ngModel)]="requiredProduct.cant" type="number" min="0.01" step="0.01" (blur)="executeComportamientos(requiredProduct)" placeholder="Cantidad"/>
				</td>
				<td [ngClass]= '{red: requiredProduct.changeColor, black: !requiredProduct.changeColor}'>{{requiredProduct.porcentajeNecesario}}</td>
			</tbody>
		</table>
	</div>
  `,
  styles: [`
	.red {
		background-color: #f2dede; 
	}
	.black {
		background-color: white;
	}
	th, td {
		text-align:center
	}
    thead {
    background-color: #607d8b;
    color: white;
	}
  `],
  providers: [RequiredProductService, ProductService, MovProductService]
})

export class RequiredProductComponent implements OnChanges{
  @Input()
  product: Producto;
  
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  
  requiredProducts: RequiredProduct[];
  okCounter: number;
  errorStck: boolean;
  
  constructor(private requiredProductService: RequiredProductService, private productService: ProductService, private movProductService: MovProductService) { }
  
  getRequiredProducts(): void {
    this.requiredProductService.getRequiredProducts(this.product._id).then(requiredProducts => {
		for (var i = 0; i < requiredProducts.length; i++) {
			if (requiredProducts[i].productoNecesarioIDPrima) {
				requiredProducts[i].productoNecesario = requiredProducts[i].productoNecesarioIDPrima;
			} else if (requiredProducts[i].productoNecesarioIDSemi) {
				requiredProducts[i].productoNecesario = requiredProducts[i].productoNecesarioIDSemi;
			} else {
				requiredProducts[i].productoNecesario = requiredProducts[i].productoNecesarioIDTerm;
			}
			
			requiredProducts[i]._id = requiredProducts[i].productoNecesario._id;
			requiredProducts[i].tipo = requiredProducts[i].productoNecesario.tipo;
		}
		this.requiredProducts = requiredProducts
		this.notify.emit('Done');
	});
  }
  
  finish(mssgSucces: string): void {
	this.okCounter++;
	if (this.okCounter == this.requiredProducts.length && !this.errorStck) { 	
		this.notify.emit(mssgSucces);
	}
  }
  
  canUpdate(): void {
	this.okCounter = 0;
	this.errorStck = false;
	for (var i = 0; i < this.requiredProducts.length && !this.errorStck; i++) {
		this.requiredProducts[i].add = false;
		this.productService.canPutNewStock(this.requiredProducts[i])
			.then(() =>  this.finish('Can'))
			.catch(err => {
				this.errorStck = true;
				if(err.status = 505) {
					this.notify.emit('StckEr');
				}else {
					this.notify.emit('Error');
				}
			});
	}  
  }
  
  putNewStock(movFinal: MovProductoFinal): void { 
	this.okCounter = 0;
	this.errorStck = false;
	for (var i = 0; i < this.requiredProducts.length; i++) {
		this.requiredProducts[i].add = false;
		this.requiredProducts[i].movimientoProduccionFinalID = movFinal._id;
		this.productService.putNewStock(this.requiredProducts[i]);
		this.movProductService.postMovimientoUsado(this.requiredProducts[i])
			.then(() => this.finish('Fin'))
			.catch(err => {
				this.errorStck = true;
				this.notify.emit('Error');
			});
	}
  }
  
  ngOnChanges(changes: { [key: string]: SimpleChange }) {		
	this.getRequiredProducts();
  }
  
  executeComportamientos(requiredProduct: RequiredProduct): void {

	this.changeAlertColor(requiredProduct);
	  
	//para poner una cantidad al producto que se va a producir, tienen que estar todos los gastos seteados, distintos de cero y con una numero correct al porcentaje.
	if ( ( this.product.cant == null || this.product.cant == 0 )  && this.allGastosSetted() && this.correctQuantityPercent()) {
		this.product.cant = CommonFunctions.round( ((this.requiredProducts[0].cant * 100 / this.requiredProducts[0].porcentajeNecesario) * ( 1 - (this.product.porcentajeMerma/100))), 2);
	}
  }
  
  setGastos(cantSinMerma: number): void {
	for (var i = 0; i < this.requiredProducts.length; i++) {
		this.requiredProducts[i].cant = CommonFunctions.round( (cantSinMerma * this.requiredProducts[i].porcentajeNecesario) / 100, 2);
		this.changeAlertColor(this.requiredProducts[i]);
	}
  }

  //si no hay stock se cambia el color.
  changeAlertColor(requiredProduct: RequiredProduct): void {
	 if ( requiredProduct.cant != null && (requiredProduct.cant > requiredProduct.productoNecesario.cantidad || requiredProduct.cant <= 0) ) {
		requiredProduct.changeColor = true;
	} else if (requiredProduct.cant && requiredProduct.cant <= requiredProduct.productoNecesario.cantidad && requiredProduct.cant > 0) {
		requiredProduct.changeColor = false;
	}
  }
  
  clean(): void {
	this.requiredProducts = null;
  }
  
  allGastosSetted(): boolean {
	var i = 0;
	for(i; i < this.requiredProducts.length && this.requiredProducts[i].cant && this.requiredProducts[i].cant > 0 ; i++) {}
	
	return this.requiredProducts.length == i;
  }
  
  allGastosEmpty(): boolean {
	var i= 0;
	for(i; i < this.requiredProducts.length && (this.requiredProducts[i].cant == null || this.requiredProducts[i].cant <= 0); i++) {}
	
	return this.requiredProducts.length == i;
  }
  
  //controla que los productos tengan el porcentaje correcto de acuerdo a la cantidad y que tengan stock.
  correctQuantityPercent(): boolean {
	var total = 0;
	
	for(var i = 0; i < this.requiredProducts.length && this.requiredProducts[i].cant && this.requiredProducts[i].cant > 0 && this.requiredProducts[i].cant <= this.requiredProducts[i].productoNecesario.cantidad ; i++) {
		total += this.requiredProducts[i].cant;
	}
	
	return CommonFunctions.round(total,2) == CommonFunctions.round(this.requiredProducts[0].cant * 100 / this.requiredProducts[0].porcentajeNecesario, 2);
  }
  
}
