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
  constructor(private shoppingCart: Cartservice, private productService: ProductsService ) {
    this.productService.products$.subscribe((data: Array<IProduct>) => {
      console.log('product cat res ', data);
      if ( data !== undefined && data !== null ){
        this.productsList = data;
        console.log(this.productsList[0]);
        this.productsList.forEach( (product) =>  {
          // tslint:disable-next-line:no-string-literal
          product.price = product['precio_unidad'];
          // tslint:disable-next-line:no-string-literal
          delete data['precio_unidad'];
          // tslint:disable-next-line:no-string-literal
          product.img = product['imagen'];
           // tslint:disable-next-line:no-string-literal
          delete data['imagen'];
          // tslint:disable-next-line:no-string-literal
          product.stock = product['cantidad_disp'];
           // tslint:disable-next-line:no-string-literal
          delete data['cantidad_disp'];
        });
    }
    });
   }

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
