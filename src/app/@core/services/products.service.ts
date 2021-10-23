import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ACTIVE_USER, REGISTER_USER } from '@graphql/operations/mutations/user';
import { PRODUCT_LIST_QUERY, PRODUCT_LIST_QUERY_BY_CATEGORIA } from '@graphql/operations/query/product';
import { USERS_LIST_QUERY } from '@graphql/operations/query/user';
import { ApiService } from '@graphql/services/api.service';
import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';
import { IRegisterForm } from '@shop/core/interfaces/register.interface';
import { Apollo } from 'apollo-angular';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class ProductsService extends ApiService{
    products = new Subject<Array<object>>();
    products$ = this.products.asObservable();
    constructor(apollo: Apollo) {
      super(apollo);
    }

    getByCategoria(
        page: number = 5,
        itemsPage: number = 10,
        filter: string
      ){
        console.log('llego al getByCategoria');
        return this.get(
            PRODUCT_LIST_QUERY_BY_CATEGORIA,
          {
            page,
            itemsPage,
            filter
          }
        ).pipe(map((result: any) => {
          console.log('Filtro ', result.products2);
          this.products.next(result.products2.products);
          console.log('productos traidos cat ', this.products);
          return  result.products2;
        }));
      }
      getProducts(){
        return this.get(PRODUCT_LIST_QUERY, {
          page: 1,
          itemsPage: 10
        }).pipe((map((result: any) => {
            console.log('get products ', result.products);
            this.products.next(result.products.products);
            console.log('productos traidos cat ', this.products);
            return result.products;
        })));
      }
    }
