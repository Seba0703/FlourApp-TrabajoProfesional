import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { ProductDetailComponent } from './product-detail.component';
import { RequiredProductComponent } from './required-product.component';
import { HttpModule }    from '@angular/http';

// Imports for loading & configuring the in-memory web api
import { ProductService } from './product.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
	HttpModule
  ],
  declarations: [
    AppComponent,
    ProductDetailComponent,
	RequiredProductComponent
  ],
  providers: [ProductService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
