import Articulo from "./articulo";

export default interface ItemVenta{
    idItem: number;
    articulo: Articulo;
    cantidad: number;
    subtotal: number;
    fechaCreacion: Date;
    fechaActualizacion: Date;
}