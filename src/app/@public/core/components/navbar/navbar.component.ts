import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth.service';
import { IMeData } from '@shop/core/interfaces/session.interface';
import {Cartservice} from '../../services/cartservice.ts.service';
import {ProductsService} from '../../../../@core/services/products.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  categoria = '';
  session: IMeData = {
    status: false
  };
  access = false;
  role: string;
  userLabel = '';
  constructor(private authService: AuthService, private shoppingCart: Cartservice , private productsService: ProductsService) {
    this.authService.accessVar$.subscribe((result) => {
      console.log(result.status);
      this.session = result;
      this.access = this.session.status;
      this.role = this.session.user?.Role;
      this.userLabel = `${ this.session.user?.name } ${ this.session.user?.lastname }`;
      console.log(this.role);
    });
  }
  ngOnInit(): void {
  }

  logout() {
    this.authService.resetSession();
  }
  open(){
    this.shoppingCart.open();
    console.log('shopping cart open');
  }
  filtarProductos(){
    console.log('cat seleccionada ', this.categoria);
    this.productsService.getByCategoria(1, 10, this.categoria).subscribe((resp: any) => {
      console.log('filtrado terminado', resp.products2);
    });
  }
  resetearProductos(){
      this.productsService.getProducts().subscribe();
  }

}
