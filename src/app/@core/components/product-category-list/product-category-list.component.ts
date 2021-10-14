import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import {Cartservice} from '../../../@public/core/services/cartservice.ts.service';
@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent implements OnInit {
  @Input() title = 'Título de la categoría';
  @Input() productsList: Array<IProduct> = [];
  constructor(private shoppingCart: Cartservice) { }

  ngOnInit(): void {
  }

  addToCart($event: IProduct) {
    console.log('Add to cart', $event);
    this.shoppingCart.manageProduct($event);
  }
  showProductDetails($event: IProduct) {
    console.log('Shoe details', $event);
  }

}
