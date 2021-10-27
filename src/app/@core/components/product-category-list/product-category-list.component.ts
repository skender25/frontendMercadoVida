import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import {Cartservice} from '../../../@public/core/services/cartservice.ts.service';
import {ProductsService} from '../../services/products.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent implements OnInit {
  @ViewChild('content', ) private content;
  @Input() title = 'Título de la categoría';
  @Input() productsList: Array<IProduct> = [];
  closeResult = '';
  productoSeleccionado: any;
  productoSeleccCarrito = false;
  constructor(private shoppingCart: Cartservice, private productService: ProductsService, private modalService: NgbModal ) {
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
    this.productoSeleccionado = $event;
    this.productoSeleccCarrito = this.shoppingCart.checkForProduct(this.productoSeleccionado.id);
    console.log('existe en el carrito ', this.productoSeleccCarrito);
    console.log('producto selecc ' , this.productoSeleccionado.productor);
    this.open(this.content);
  }
  getProducts(){
     this.productService.getProducts().subscribe((resp: any) => {
       this.productsList = resp.products;
     });
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  eliminarProducto(){
    this.productoSeleccCarrito = false;
    this.productoSeleccionado.qty = 0;
    this.shoppingCart.manageProduct(this.productoSeleccionado);
  }
}

