import { IProduct } from '@mugan86/ng-shop-ui/lib/interfaces/product.interface';

export interface ICart{
    total: number; // total a pagar por el pedido
    subtotal: number; // cantidad de productos totales
    products: Array<IProduct>; // productos almacenados
}
