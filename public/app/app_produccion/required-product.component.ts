import { Component, Input, OnInit } from '@angular/core';
import { RequiredProduct } from './required-product';
import { RequiredProductService } from './required-product.service';
import { Producto } from './producto';

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
				<td><input [(ngModel)]="requiredProduct.spend" (blur)="setCantidad()" placeholder="Cantidad"/></td>
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
  
  requiredProducts: RequiredProduct[];
  
  constructor(private requiredProductService: RequiredProductService) { }
  
  getRequiredProducts(): void {
    this.requiredProductService.getRequiredProducts().then(requiredProducts => this.requiredProducts = requiredProducts);
  }
 
  ngOnInit(): void {
    this.getRequiredProducts();
  }
  
  setCantidad(): void {
	if (this.product.cant == null && this.allGastosSetted()) {
		console.log('perdio foco del ultimo y setea');
	}
  }
  
  allGastosSetted(): boolean {
	
	for(var i = 0; i < this.requiredProducts.length && this.requiredProducts[i].spend != null; i++) {}
	
	return this.requiredProducts[i].spend != null;
	
  }
  
}
