import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { SignOutComponent }  from '../sign-out/signOutComponent';
import { MateriaPrimaComponent} from './materiaPrimaComponent';
import { AgregadorMateriaPrimaComponent} from './agregadorMateriaPrimaComponent';
import { MateriaPrimaServices} from './materiaPrimaServices';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    SignOutComponent,
    MateriaPrimaComponent,
    AgregadorMateriaPrimaComponent
  ],
  providers: [ MateriaPrimaServices ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
