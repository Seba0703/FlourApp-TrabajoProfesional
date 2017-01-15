import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { RequiredProduct } from './required-product';
import { RequiredProductService } from './required-product.service';
import { Producto } from './producto';
import { CommonFunctions } from './common-functions';

@Component({
  selector: 'required-product-detail',
  template: `
	<div *ngIf="requiredProducts" style="overflow-x:auto;">
		<table class="table">
			<thead>
			  <tr>
				<th>Productos necesarios </th>
				<th>Stock  </th>
				<th>Unidad </th>
				<th>Gasto </th>
			  </tr>
			</thead>
			<tbody *ngFor="let requiredProduct of requiredProducts">
				<td>{{requiredProduct.name}}</td>
				<td [ngClass]= '{red: requiredProduct.changeColor, black: !requiredProduct.changeColor}'>{{requiredProduct.stock}}</td>
				<td>{{requiredProduct.unit}}</td>
				<td><input [(ngModel)]="requiredProduct.spend" type="number" min="0.01" step="0.01" (blur)="executeComportamientos(requiredProduct)" placeholder="Cantidad"/></td>
			</tbody>
		</table>
	</div>
  `,
  styles: [`
	.red {
		background-color: red; 
		color: white;
	}
	.black {
		background-color: white;
		color: black;
	}
    .th {
    background-color: #4CAF50;
    color: white;
	}
  `],
  providers: [RequiredProductService]
})

export class RequiredProductComponent implements OnInit{
  @Input()
  product: Producto;
  
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  
  requiredProducts: RequiredProduct[];
  
  constructor(private requiredProductService: RequiredProductService) { }
  
  getRequiredProducts(): void {
    this.requiredProductService.getRequiredProducts().then(requiredProducts => {
		this.requiredProducts = requiredProducts
		this.notify.emit('Done');
	});
  }
  
  ngOnInit(): void {
    this.getRequiredProducts();
  }
  
  executeComportamientos(requiredProduct: RequiredProduct): void {
	//si no hay stock se cambia el color.
	if (requiredProduct.spend && requiredProduct.spend > requiredProduct.stock) {
		requiredProduct.changeColor = true;
	} else if (requiredProduct.spend && requiredProduct.spend <= requiredProduct.stock) {
		requiredProduct.changeColor = false;
	}
	  
	//para poner una cantidad al producto que se va a producir, tienen que estar todos los gastos seteados, distintos de cero y con una numero correct al porcentaje.
	if ( (!this.product.cant || this.product.cant == 0 )  && this.allGastosSetted() && this.correctQuantity()) {
		this.product.cant = CommonFunctions.round( ((this.requiredProducts[0].spend / this.requiredProducts[0].percent) * ( 1 - this.product.merma)), 2);
	}
  }
  
  setGastos(cantSinMerma: number): void {
	for (var i = 0; i < this.requiredProducts.length; i++) {
		this.requiredProducts[i].spend = CommonFunctions.round( cantSinMerma * this.requiredProducts[i].percent, 2);
	}
  }
  
  allGastosSetted(): boolean {
	var i = 0;
	for(i; i < this.requiredProducts.length && this.requiredProducts[i].spend && this.requiredProducts[i].spend != 0; i++) {}
	
	return this.requiredProducts.length == i;
  }
  
  allGastosEmpty(): boolean {
	var i= 0;
	for(i; i < this.requiredProducts.length && (!this.requiredProducts[i].spend || this.requiredProducts[i].spend == 0); i++) {}
	
	return this.requiredProducts.length == i;
  }
  
  //controla que los productos tengan el porcentaje correcto de acuerdo a la cantidad y que tengan stock.
  correctQuantity(): boolean {
	var total = 0;
	for(var i = 0; i < this.requiredProducts.length && this.requiredProducts[i].spend > this.requiredProducts[i].stock ; i++) {
		total += this.requiredProducts[i].spend;
	}
	
	return CommonFunctions.round(total,2) == CommonFunctions.round(this.requiredProducts[0].spend / this.requiredProducts[0].percent, 2);
  }
  
}
