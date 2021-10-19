import { Component, OnInit } from '@angular/core';
import { ICart } from '@shop/core/components/shopping-cart/shopping-cart.interface';
import {Cartservice} from '../../../../core/services/cartservice.ts.service';
@Component({
  selector: 'app-checkout-resume',
  templateUrl: './checkout-resume.component.html',
  styleUrls: ['./checkout-resume.component.scss']
})
export class CheckoutResumeComponent implements OnInit {
  cart: ICart;
  constructor(private shoppingCart: Cartservice) {
    this.shoppingCart.itemsVar$.subscribe(( data: ICart) => {
      if ( data !== undefined && data !== null ){
        this.cart = data;
    }
    });
  }
  ngOnInit(): void {
    this.cart = this.shoppingCart.initialize();
  }

}
