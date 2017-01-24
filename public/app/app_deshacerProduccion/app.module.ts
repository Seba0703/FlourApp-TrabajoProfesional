import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { AppComponent }  from './app.component';
import { NavMenuComponent } from '../nav-menu/navMenuComponent';
import { SignOutComponent }  from '../sign-out/signOutComponent';
import { HttpModule }    from '@angular/http';
import { ModalModule } from 'ng2-bootstrap';

// Imports for loading & configuring the in-memory web api
import { MovProductService } from './mov-product.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
	HttpModule,
	ModalModule.forRoot()
  ],
  declarations: [
    AppComponent,
    NavMenuComponent,
    SignOutComponent
  ],
  providers: [MovProductService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
