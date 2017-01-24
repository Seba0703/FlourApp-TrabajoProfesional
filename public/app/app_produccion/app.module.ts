import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { NavMenuComponent } from '../nav-menu/navMenuComponent';
import { SignOutComponent }  from '../sign-out/signOutComponent';
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
    NavMenuComponent,
    SignOutComponent,
    ProductDetailComponent,
	RequiredProductComponent
  ],
  providers: [ProductService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
