import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
import { ProductCategoryListModule } from '@core/components/product-category-list/product-category-list.module';
import { CarouselItemsModule, ProductItemModule } from '@mugan86/ng-shop-ui';


@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    ContactRoutingModule,
    CarouselItemsModule,
    ProductItemModule,
    ProductCategoryListModule
  ]
})
export class ContactModule { }
