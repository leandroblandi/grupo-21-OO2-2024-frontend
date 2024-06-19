import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Articulo from '../models/articulo';
import LoteArticulo from '../models/loteArticulo';

@Injectable({
  providedIn: 'root',
})
export class LoteService {
  url: string = environment.url;
  prefix: string = environment.prefix;
  lotes: string = environment.lotes;

  constructor(private http: HttpClient) {}

  getLotes(): Observable<LoteArticulo[]> {
    return this.http.get<LoteArticulo[]>(this.url + this.prefix + this.lotes);
  }

  aprovisionar(idArticulo: number, cantidad: number): Observable<LoteArticulo> {
    return this.http.put<LoteArticulo>(
      this.url +
        this.prefix +
        this.lotes +
        '/articulo/' +
        idArticulo +
        '?cantidadRequerida=' +
        cantidad,
      null
    );
  }

  crearLote(
    idArticulo: number,
    cantidad: number,
    precioCompra: number,
    proveedor: string,
    costo: number
  ): Observable<LoteArticulo> {
    let loteDto = {
      idArticulo: idArticulo,
      cantidad: cantidad,
      precioCompra: precioCompra,
      proveedor: proveedor,
      costo: costo,
    };
    return this.http.post<LoteArticulo>(
      this.url + this.prefix + this.lotes,
      loteDto
    );
  }

  eliminarLote(id: number): Observable<Boolean> {
    return this.http.delete<Boolean>(
      this.url + this.prefix + this.lotes + '/' + id
    );
  }
}
