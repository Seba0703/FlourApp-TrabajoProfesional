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
				<td>{{requiredProduct.stock}}</td>
				<td>{{requiredProduct.unit}}</td>
				<td><input [(ngModel)]="requiredProduct.spend" type="number" min="0" step="0.01" (blur)="setCantidad()" placeholder="Cantidad"/></td>
			</tbody>
		</table>
	</div>
  `,
  styles: [`
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
  
  getRequiredProductsCreated(): RequiredProduct[] {
	return this.requiredProducts;
  }
 
  ngOnInit(): void {
    this.getRequiredProducts();
  }
  
  setCantidad(): void {
	//para poner una cantidad al producto que se va a producir, tienen que estar todos los gastos seteados, distintos de cero y con una numero correct al porcentaje.
	if ( (!this.product.cant || this.product.cant == 0 ) && this.allGastosSetted() && this.correctQuantity()) {
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
	for(i = 0; i < this.requiredProducts.length && this.requiredProducts[i].spend && this.requiredProducts[i].spend != 0; i++) {}
	
	return this.requiredProducts.length == i;
  }
  
  allGastosEmpty(): boolean {
	var i = 0;
	for(i = 0; i < this.requiredProducts.length && (!this.requiredProducts[i].spend || this.requiredProducts[i].spend == 0); i++) {}
	
	return this.requiredProducts.length == i;
  }
  
  //controla que los productos tengan el porcentaje correcto de acuerdo a la cantidad.
  correctQuantity(): boolean {
	var total = 0;
	for(var i = 0; i < this.requiredProducts.length; i++) {
		total += this.requiredProducts[i].spend;
	}
	
	return CommonFunctions.round(total,2) == CommonFunctions.round(this.requiredProducts[0].spend / this.requiredProducts[0].percent, 2);
  }
  
}
