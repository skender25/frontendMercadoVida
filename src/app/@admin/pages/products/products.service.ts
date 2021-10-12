import { ADD_PRODUCT, MODIFY_PRODUCT, BLOCK_PRODUCT } from './../../../@graphql/operations/mutations/product';
import { Injectable } from '@angular/core';
import { ApiService } from '@graphql/services/api.service';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ApiService{

  constructor(apollo: Apollo) {
    super(apollo);
  }

  add(product: string , productor: string , catregoria: string,imagen: string,
    precio_unidad: string,cantidad_disp: string,org: string,unidad: string) {
    return this.set(
      ADD_PRODUCT,
      {
        product,
        productor,
        catregoria,
        imagen,
        precio_unidad,
        cantidad_disp,
        org,
        unidad
      


      }, {}).pipe(map( (result: any) => {
        return result.addProducts;
      }));
  }

  update(id: string, product: string , productor: string, catregoria: string ,imagen: string,
    precio_unidad: string,cantidad_disp: string,org: string,unidad: string ) {
    console.log(id , product , productor,cantidad_disp ,precio_unidad, imagen,org,unidad);
   return this.set(
      MODIFY_PRODUCT,
      {
        id,
        product,
        productor,
        catregoria,
        imagen,
        precio_unidad,
        cantidad_disp,
        org,
        unidad
      }, {}).pipe(map( (result: any) => {
        return result.updateProducts;
      }));
  }

  block(id: string) {
    return this.set(
      BLOCK_PRODUCT,
      {
        id
      }, {}).pipe(map( (result: any) => {
        return result.blockProducts;
      }));
  }

  
  
}
