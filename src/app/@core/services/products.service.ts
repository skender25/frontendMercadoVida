import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ACTIVE_USER, REGISTER_USER } from '@graphql/operations/mutations/user';
import { PRODUCT_LIST_QUERY_BY_CATEGORIA } from '@graphql/operations/query/product';
import { USERS_LIST_QUERY } from '@graphql/operations/query/user';
import { ApiService } from '@graphql/services/api.service';
import { IRegisterForm } from '@shop/core/interfaces/register.interface';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
  })
  export class ProductsService extends ApiService{
  
    constructor(apollo: Apollo) {
      super(apollo);
    }

    getByCategoria(
        page: number = 1,
        itemsPage: number = 10,
        filter: string = 'finca-manantial'
      ){
        return this.get(
            PRODUCT_LIST_QUERY_BY_CATEGORIA,
          {
            page,
            itemsPage,
            filter
          }
        ).pipe(map((result: any) => {
          return  result.products;
        }));
      }


    }

  