import ItemVenta from "./itemVenta";

export default interface Venta {
    idVenta: number;
    fechaVenta: Date;
    items: ItemVenta[];
    precio: number;
    fechaCreacion: Date;
    fechaActualizacion: Date;
  }