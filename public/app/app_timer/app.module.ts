import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { Timer }  from './timer';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ Timer ],
  bootstrap:    [ Timer ]
})
export class AppModule { }
