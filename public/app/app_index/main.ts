import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { IndexService } from './indexService';
import { IndexComponent } from './indexComponent';

@NgModule({
  imports: [ BrowserModule, HttpModule, FormsModule ],
  declarations: [ IndexComponent ],
  providers: [ IndexService ],
  bootstrap: [ IndexComponent ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);
