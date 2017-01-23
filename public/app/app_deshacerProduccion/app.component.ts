import { Component, ViewChild, OnInit } from '@angular/core';
import { MovProductoFinal } from './mov-product-final';
import { MovProductoUsado } from './mov-product-usado';
import { MovProductService } from './mov-product.service';
import { Producto } from '../app_produccion/producto';
import { ModalDirective } from 'ng2-bootstrap';

@Component({
  selector: 'deshacer-app',
  templateUrl: 'app/app_deshacerProduccion/deshacerComponent.html',
  styles: [`
  
  `],
  providers: [MovProductService]
})
export class AppComponent implements OnInit {
  productosFinal: MovProductoFinal[];
  productosUsado: MovProductoUsado[];
  selectedProduct: MovProductoFinal;
  @ViewChild('openB') 
  public infoModal: ModalDirective;
  
  constructor(private productService: MovProductService) { }
  
  getProducts(): void {
	
    this.productService.getProductsFinal().then(productosFinal => this.productosFinal = productosFinal);
  }
  
  verProducto(producto: MovProductoFinal): void {
	this.productService.getProductsUsado(producto._id).then(productosUsado => {
		this.productosUsado = productosUsado;
		this.infoModal.show();
	});
  }
  
  borrar(producto: MovProductoFinal): void {
	this.productService.deleteProductFinal(producto._id)
		.then(() => {
			this.productosFinal = this.productosFinal.filter(p => p !== producto);
		}
	);
  }
  
  
  
  cancelar(): void {
	this.productosUsado = null;
  }
 
  ngOnInit(): void {
    this.getProducts();
  }
  
  onSelect(producto: MovProductoFinal): void {
    this.selectedProduct = producto;
  }
}
