import { Component, OnInit } from '@angular/core';
import { DocumentNode } from 'graphql';
import { IResultData } from '@core/interfaces/result-data.interface';
import { ITableColumns } from '@core/interfaces/table-columns.interface';
import { PRODUCT_LIST_QUERY, PRODUCT_LIST_QUERY_BY_CATEGORIA } from '@graphql/operations/query/product';
import { formBasicDialog, optionsWithDetails } from '@shared/alerts/alerts';
import { ProductsService } from './products.service';
import { basicAlert } from '@shared/alerts/toasts';
import { TYPE_ALERT } from '@shared/alerts/values.config';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  [x: string]: any;
  query: DocumentNode = PRODUCT_LIST_QUERY_BY_CATEGORIA; //  PRODUCT_LIST_QUERY;
  context: object;
  itemsPage: number;
  resultData: IResultData;
  include: boolean;
  columns: Array<ITableColumns>;
  constructor(private service: ProductsService) {}
  ngOnInit(): void {
    this.context = {};
    this.itemsPage = 10;
    this.resultData = {
      listKey: 'products',
      definitionKey: 'products'
    };
    this.include = false;
    this.columns = [
      {
        property: 'id',
        label: '#'
      },
      {
        property: 'name',
        label: 'Nombre del producto'
      },
      {
        property: 'productor',
        label: 'Productor'
      },
      {
        property: 'catregoria',
        label: 'Categoria'
      },
      {
        property: 'imagen',
        label: 'Imagen'
      },
      {
        property: 'precio_unidad',
        label: 'Precio Unidad'
      },
      {
        property: 'cantidad_disp',
        label: 'Cantidad'
      },
      {
        property: 'org',
        label: 'org'
      },
      {
        property: 'unidad',
        label: 'unidad'
      }

    ];
  }

  async takeAction($event) {
    // Coger la información para las acciones
    const action = $event[0];
    const product = $event[1];
    const productor = $event[3];
    // Cogemos el valor por defecto
    const defaultValue =
      product.name !== undefined && product.name !== '' ? product.name : 'Nombre';
      const defaultValues = 
       product.productor !== undefined && product.productor !== '' ? product.productor : 'Productor';
       const defaultValuess = product.catregoria !== undefined && product.catregoria !== '' ? product.catregoria : 'catregoria';
       const precios = 
       product.precio_unidad !== undefined && product.precio_unidad !== '' ? product.precio_unidad : 'Precio Unidad';
       const cant = 
       product.cantidad_disp !== undefined && product.cantidad_disp !== '' ? product.cantidad_disp : 'Cantidad ';
       const img_url = 
       product.imagen !== undefined && product.imagen !== '' ? product.imagen : 'Imagen Url ';
       const org = 
       product.org !== undefined && product.org !== '' ? product.org : 'org ';
       const unidad = 
       product.unidad !== undefined && product.unidad !== '' ? product.unidad : 'unidad ';
    
       const html = `<input id="name" value="${defaultValue}" class="swal2-input" required>
    <input id="names" value="${defaultValues}" class="swal2-input" required>
    <input id="catregoria" value="${defaultValuess}" class="swal2-input" required>
    <input id="precio_unidad" value="${precios}" class="swal2-input" required>
    <input id="cantidad_disp" value="${cant}" class="swal2-input" required>
    <input id="imagen" value="${img_url}" class="swal2-input" required>
    <input id="org" value="${org}" class="swal2-input" required>
    <input id="unidad" value="${unidad}" class="swal2-input" required>`
    ;
    // Teniendo en cuenta el caso, ejecutar una acción
  // console.log($event[0],$event[1],$event[3]);
   if (action == 'add'){
    this.addForm(html);
     return;
   }
   if (action == 'edit'){
    this.updateForm(html, product);
    return;
  }
  if (action == 'info'){
    const result = await optionsWithDetails(   'Detalles',
    `Producto : ${product.name} <br/> Productor: ${product.productor}`,
    375,
    '<i class="fas fa-edit"></i> Editar', // true
    '<i class="fas fa-lock"></i> Bloquear'
  ); // false
  if (result) {
    this.updateForm(html, product);
  } else if (result === false) {
    this.blockForm(product);
  }
    return;
  }
  if (action == 'block'){
    this.blockForm(product);
    
  }

  }

  private async addForm(html: string) {
    const result = formBasicDialog('Agregar producto' , html , 'name' );
    console.log((await result).value);
    //var p = (await result).value.value
    this.addProduct(result);
  }

  async addProduct(result) {
    if ((await result).value){
      this.service.add((await result).value.value , (await result).value.values
      , (await result).value.catregoria,(await result).value.imagen,
      (await result).value.precio_unidad,(await result).value.cantidad_disp,
      (await result).value.org,(await result).value.unidad).subscribe(
       (res: any)=> {
         console.log(res);
        
         if (res.status) {
           basicAlert(TYPE_ALERT.SUCCESS, res.message);
           return;
         }
         basicAlert(TYPE_ALERT.WARNING, res.message);
       }
     
      );
     }
  }

  private async updateForm(html: string, product: any) {
    const result = await formBasicDialog('Modificar producto', html, 'name');
    console.log(result);
    this.updateProduct(product.id, result);
  }
  async updateProduct(id: string ,result) {
    if ((await result).value){
      this.service.update(id,(await result).value.value ,(await result).value.values,
       (await result).value.catregoria,(await result).value.imagen,
      (await result).value.precio_unidad,(await result).value.cantidad_disp,
      (await result).value.org,(await result).value.unidad ).subscribe(
       (res: any)=> {
         console.log(res);
        
         if (res.status) {
           basicAlert(TYPE_ALERT.SUCCESS, res.message);
           return;
         }
         basicAlert(TYPE_ALERT.WARNING, res.message);
       }
     
      );
     }
  }

  private blockProducts(id: string) {
    this.service.block(id).subscribe((res: any) => {
      console.log(res);
      if (res.status) {
        basicAlert(TYPE_ALERT.SUCCESS, res.message);
        return;
      }
      basicAlert(TYPE_ALERT.WARNING, res.message);
    });
  }

  private async blockForm(product: any) {
    const result = await optionsWithDetails(
      '¿Bloquear?',
      `Si bloqueas el item seleccionado, no se mostrará en la lista`,
      430,
      'No, no bloquear',
      'Si, bloquear'
    );
    if (result === false) {
      // Si resultado falso, queremos bloquear
      this.blockProducts(product.id);
    }
  }
  
}
