import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import Articulo from '../models/articulo';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  url: string = environment.url;
  prefix: string = environment.prefix;
  articulos: string = environment.articulos;

  constructor(private http: HttpClient) { }

  getArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.url + this.prefix + this.articulos);
  }

  crearArticulo(descripcion : string, costo: number, precioVenta:number): Observable<Articulo>{
    let articuloDto={
      descripcion: descripcion, costo:costo, precioVenta:precioVenta
    }
    return this.http.post<Articulo>(this.url + this.prefix + this.articulos,articuloDto);
  }

  eliminarArticulo(id:number): Observable<Articulo>{
    return this.http.delete<Articulo>(this.url + this.prefix + this.articulos + "/"+ id);
  }
}
