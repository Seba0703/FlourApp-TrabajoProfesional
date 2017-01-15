import { Component, Input } from '@angular/core';
import { Producto } from './producto';
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
		
		<required-product-detail [product]="producto"></required-product-detail> 
		
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
  
  fabricar(): void {
	console.log('post server');
  }
  
  setGastos(): void {
	console.log('perdio el foco');
  }
  
}
