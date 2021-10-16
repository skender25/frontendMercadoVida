import { Injectable } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { Subject } from 'rxjs/internal/Subject';
import { ICart } from '../components/shopping-cart/shopping-cart.interface';

@Injectable({
  providedIn: 'root'
})
export class Cartservice {
  products: Array<IProduct> = [];
  cart: ICart = {
    total: 0,
    subtotal: 0,
    products: this.products
  };
  // estas dos variables se utilizan para poder actualizar el carrito cuando se añada o eliminen elementos
  public itemsVar = new Subject<ICart>();
  public itemsVar$ = this.itemsVar.asObservable();
  /*
    inicialización del carrito de compras
  */
  initialize(){
    const storageData = JSON.parse(localStorage.getItem('cart'));
    if (storageData !== null){
      this.cart = storageData;
    }
    return this.cart;
  }
  public updateItemsInCart(newValue: ICart){
    this.itemsVar.next(newValue);
  }

  constructor() { }
  manageProduct(product: IProduct){
    // Obtener cantidad de productos del carrito
      const totalOfProducts = this.cart.products.length;
      if ( totalOfProducts === 0) {
      this.cart.products.push(product);
    } else {
        let actionUpdatedOk = false;
        for ( let i = 0; i < totalOfProducts; i++ ){
          if ( product.id === this.cart.products[i].id){
            if ( product.qty === 0){
              this.cart.products.splice(i, 1);
            }else {
              this.cart.products[i] = product;
            }
            actionUpdatedOk = true;
            i = totalOfProducts;
          }
        }
        if (!actionUpdatedOk){
            this.cart.products.push(product);
        }
    }
      this.checkoutTotal();
  }
  checkoutTotal(){
    let total = 0;
    let subtotal = 0;
    this.cart.products.map((product: IProduct) => {
      total += (product.qty * product.price);
      subtotal +=  product.qty;
    });
    this.cart.total = total;
    this.cart.subtotal = subtotal;
    this.setInfo();
  }
  clear(){
    this.products = [];
    this.cart = {
      total: 0,
      subtotal: 0,
      products: this.products
    };
    this.setInfo();
    console.log('borrando info del carrito');
    return this.cart;
  }
  private setInfo(){
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateItemsInCart(this.cart);
  }
  open(){
  document.getElementById('mySidenav').style.width = '600px';
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('app').style.overflow = 'hidden';
  }
  close(){
  document.getElementById('mySidenav').style.width = '0';
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('app').style.overflow = 'auto';
  }
}
