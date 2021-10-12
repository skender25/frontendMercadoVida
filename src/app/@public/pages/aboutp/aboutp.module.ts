import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutpRoutingModule } from './aboutp-routing.module';
import { AboutpComponent } from './aboutp.component';


@NgModule({
  declarations: [AboutpComponent],
  imports: [
    CommonModule,
    AboutpRoutingModule
  ]
})
export class AboutpModule { }
