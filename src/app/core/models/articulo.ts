export default interface Articulo {
  idArticulo: number;
  descripcion: string;
  costo: number;
  precioVenta: number;
  fechaCreacion: Date;
  fechaActualizacion: Date;
  activo: boolean;
  estaEnUnLote: boolean;
}