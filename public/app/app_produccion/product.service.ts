import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { PRODUCTOS } from './mock-product';
@Injectable()
export class ProductService {
  getProducts(): Promise<Producto[]> {
    return Promise.resolve(PRODUCTOS);
  }
}
