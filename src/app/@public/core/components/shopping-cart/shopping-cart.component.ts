import { Component, OnInit } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import {Cartservice} from '../../services/cartservice.ts.service';
import { ICart } from './shopping-cart.interface';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart: ICart;
  constructor(private shoppingCart: Cartservice) {
    this.shoppingCart.itemsVar$.subscribe((data: ICart) => {
        if ( data !== undefined && data !== null ){
            this.cart = data;
        }
    });
   }

  ngOnInit(): void {
    this.cart =  this.shoppingCart.initialize();
  }
  closeNav(){
    this.shoppingCart.close();
  }
  clear(){
   this.cart =  this.shoppingCart.clear();
  }
  clearItem(product: IProduct){
    product.qty = 0;
    this.shoppingCart.manageProduct(product);
  }
}
