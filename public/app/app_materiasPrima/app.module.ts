import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { MateriaPrimaComponent} from './materiaPrimaComponent';
import { AgregadorMateriaPrimaComponent} from './agregadorMateriaPrimaComponent';
//import { MateriaPrimaServices} from './materiaPrimaServices';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    MateriaPrimaComponent,
    AgregadorMateriaPrimaComponent
  ],
  providers: [  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
