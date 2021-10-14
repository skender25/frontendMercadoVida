import { UsersService } from '@core/services/users.service';
import { AuthService } from '@core/services/auth.service';
import { Apollo } from 'apollo-angular';
import { ApiService } from '@graphql/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ICarouselItem } from '@mugan86/ng-shop-ui/lib/interfaces/carousel-item.interface';
import carouselItems from '../../../../assets/@data/carousel.json';
import productsList from '../../../../assets/@data/products.json';
import {ProductsService} from '@core/services/products.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: ICarouselItem[] = [];
  listOne;
  listTwo;
  listThree;
  productsList;
  constructor(private api: UsersService , private auth: AuthService, private service: ProductsService) { }

  ngOnInit(): void {
    this.items = carouselItems;
    this.productsList = productsList;
  /*  this.api.getUsers().subscribe( result => {
      console.log('chupai' ,result); // { { status message users: []}
    });
   /* this.auth.login("alex26595@gmalifsdgb.com","dona").subscribe( result => {
      console.log(result); // { { status message users: []}
    });

    this.api.getUsers().subscribe( result => {
      console.log(result); // { { status message users: []}
    });

    this.auth.getMe().subscribe( result => {
      console.log(result); // { { status message users: []}
    });*/

  }

  addToCart($event){
    console.log('Add to card ',$event);
  }
  showProductDetails($event){
    console.log('Details ',$event);
  }
}
