import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import {Cartservice} from '../../../@public/core/services/cartservice.ts.service';
import {ProductsService} from '../../services/products.service';
@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent implements OnInit {
  @Input() title = 'Título de la categoría';
  @Input() productsList: Array<IProduct> = [];
  constructor(private shoppingCart: Cartservice, private productService: ProductsService ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  addToCart($event: IProduct) {
    console.log('Add to cart', $event);
    this.shoppingCart.manageProduct($event);
  }
  showProductDetails($event: IProduct) {
    console.log('Shoe details', $event);
  }
  getProducts(){
     this.productService.getProducts().subscribe((resp: any) => {
       this.productsList = resp.products;
     });
  }
}
