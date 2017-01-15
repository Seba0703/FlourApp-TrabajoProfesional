import { Injectable } from '@angular/core';
import { RequiredProduct } from './required-product';
import { REQUIRED_PRODUCT } from './mock-required-product';

@Injectable()
export class RequiredProductService {
	
  getRequiredProducts(): Promise<RequiredProduct[]> {
    return Promise.resolve(REQUIRED_PRODUCT);
  }
  
}

