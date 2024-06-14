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
}
