import Articulo from './articulo';

export default interface LoteArticulo {
  idLote: number;
  articulo: Articulo;
  cantidad: number;
  precioCompra: number;
  proveedor: string;
  fechaRecepcion: Date;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}
