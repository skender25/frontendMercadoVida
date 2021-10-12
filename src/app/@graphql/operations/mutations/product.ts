import gql from 'graphql-tag';
import { PRODUCT_FRAGMENT } from './../fragment/product';

export const ADD_PRODUCT = gql`
    mutation insertarProducto($product: String! , $productor: String!,$catregoria: String , $precio_unidad: String,
$imagen: String ,$cantidad_disp: String ,$org: String ,$unidad: String ) {
        addProducts(product: $product, productor: $productor ,
        catregoria: $catregoria ,imagen:$ imagen,
         precio_unidad: $precio_unidad ,
         cantidad_disp: $cantidad_disp,
         org: $org , unidad: $unidad) {
            status
            message
            product {
                ...ProductObject
            }
        }
    }
    ${ PRODUCT_FRAGMENT }
`;

export const MODIFY_PRODUCT = gql`
    mutation modificarProducto($id: ID!, $product: String! ,$productor: String!,$catregoria: String , $precio_unidad: String,
$imagen: String ,$cantidad_disp: String ,$org: String ,$unidad: String ) {
        updateProducts(id: $id, product: $product ,productor: $productor ,
         catregoria: $catregoria ,imagen:$ imagen,
         precio_unidad: $precio_unidad ,
         cantidad_disp: $cantidad_disp,
         org: $org , unidad: $unidad ) {
            status
            message
            product {
                ...ProductObject
            }
        }
    }
    ${ PRODUCT_FRAGMENT }
`;


export const BLOCK_PRODUCT = gql`
    mutation bloquearProducto($id: ID!) {
        blockProducts(id: $id) {
            status
            message
        }
    }
`;
