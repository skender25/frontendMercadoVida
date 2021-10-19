import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private shoppingCart: Cartservice, private router: Router) {
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
    this.manageProductInfo(0, product);
  }
  changeValue(qty: number, product: IProduct){
    console.log('valor qty actual', qty);
    this.manageProductInfo(qty, product);
  }
  manageProductInfo(qty: number , product: IProduct){
    product.qty = qty;
    this.shoppingCart.manageProduct(product);
  }
  // en este metodo se mandaría los correos a la empresa y a la persona que realiza el pedido
  finalizarPedido(){
    this.closeNav();
    this.router.navigate(['/checkout']);
  }
}
