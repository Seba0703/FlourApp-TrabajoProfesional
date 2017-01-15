import { Component, ViewChild, Input } from '@angular/core';
import {RequiredProductComponent} from './required-product.component'
import {RequiredProduct} from './required-product'
import { Producto } from './producto';
import { CommonFunctions } from './common-functions';

@Component({
  selector: 'my-product-detail',
  template: `
	<div *ngIf="producto">
		
		<table class="table">
			
			<thead>
			  <tr>
				<th>ProductoID</th>
				<th>A producir: </th>
				<th>Cantidad </th>
				<th>Unidad </th>
			  </tr>
			</thead>
			
			<tbody>
				<td>{{producto.id}}</td>
				<td>{{producto.name}}</td>
				<td><input [(ngModel)]="producto.cant" (blur)="setGastos()" placeholder="Cantidad"/></td>
				<td>{{producto.unit}}</td>
			</tbody>
			
		</table>
		
		<required-product-detail #required (notify)="onNotify($event)" [product]="producto"></required-product-detail> 
		
		<div style="text-align:center">  
			<button (click)="fabricar()" type="button" class="btn btn-primary">Fabricar</button>
		</div>
		
	</div>
  `,
  styles:[`
	
 `]
})
export class ProductDetailComponent {
  @Input()
  producto: Producto;
  requiredListDone: boolean = false;
  @ViewChild('required') requiredProds: RequiredProductComponent;
  
  fabricar(): void {
	console.log('post server');
  }
  
  onNotify(message:string):void {
    this.requiredListDone = true;
  }
  
  setGastos(): void {
	if (this.requiredListDone && this.requiredProds.allGastosEmpty()) {
		this.requiredProds.setGastos(this.producto.cant / (1 - this.producto.merma));
		console.log('perdio el foco');
	}
  }
  
}
