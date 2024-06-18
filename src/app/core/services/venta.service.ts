import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import Venta from '../models/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  url: string = environment.url;
  prefix: string = environment.prefix;
  ventas: string = environment.ventas;

  constructor(private http: HttpClient) { }

  generarVenta(dto: any): Observable<Venta>{
    console.log(this.url + this.prefix + this.ventas);
    console.log(dto);
    return this.http.post<Venta>(this.url + this.prefix + this.ventas, dto);
  }

}


