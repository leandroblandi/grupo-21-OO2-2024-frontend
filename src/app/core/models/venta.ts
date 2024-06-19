import ItemVenta from './itemVenta';

export default interface Venta {
  idVenta: number;
  fechaVenta: Date;
  items: ItemVenta[];
  precioFinal: number;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}
