import gql from 'graphql-tag';

export const PRODUCT_FRAGMENT = gql`
    fragment ProductObject on Products {
        id
        name
        productor
        catregoria
        imagen
        precio_unidad
        cantidad_disp
        org
        unidad
    }
`;
