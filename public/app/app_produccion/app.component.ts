import { Component, OnInit } from '@angular/core';
import { Producto } from './producto';
import { ProductService } from './product.service';
@Component({
  selector: 'my-app',
  template: `
    <h1>{{title}}</h1>
	<div class="container-fluid">
		<div class="row">
			<div>
				<div style="text-align:center">¿Qué producto desea fabricar?</div>
				<ul class="productos">
				  <li *ngFor="let producto of productos"
					[class.selected]="producto === selectedProduct"
					(click)="onSelect(producto)">
						<span class="badge">{{producto.id}}</span> {{producto.name}}
				  </li>
				</ul>
			   
			</div>		
			
			<my-product-detail [producto]="selectedProduct"></my-product-detail> 
			
		</div>
	</div>
  `,
  styles: [`
    .selected {
      background-color: #CFD8DC !important;
      color: white;
    }
    .productos {
      margin: 0 0 2em 0;
      list-style-type: none;
      padding: 0;
      width: 15em;
    }
    .productos li {
      cursor: pointer;
      position: relative;
      left: 0;
      background-color: #EEE;
      margin: .5em;
      padding: .3em 0;
      height: 1.6em;
      border-radius: 4px;
    }
    .productos li.selected:hover {
      background-color: #BBD8DC !important;
      color: white;
    }
    .productos li:hover {
      color: #607D8B;
      background-color: #DDD;
      left: .1em;
    }
    .productos .text {
      position: relative;
      top: -3px;
    }
    .productos .badge {
      display: inline-block;
      font-size: small;
      color: white;
      padding: 0.8em 0.7em 0 0.7em;
      background-color: #607D8B;
      line-height: 1em;
      position: relative;
      left: -1px;
      top: -4px;
      height: 1.8em;
      margin-right: .8em;
      border-radius: 4px 0 0 4px;
    }
  `],
  providers: [ProductService]
})
export class AppComponent implements OnInit {
  
  title = 'Pruduccion';
  productos: Producto[];
  selectedProduct: Producto;
  
  constructor(private productService: ProductService) { }
  
  getProducts(): void {
    this.productService.getProducts().then(productos => this.productos = productos);
  }
 
  ngOnInit(): void {
    this.getProducts();
  }
  
  onSelect(producto: Producto): void {
    this.selectedProduct = producto;
  }
}
