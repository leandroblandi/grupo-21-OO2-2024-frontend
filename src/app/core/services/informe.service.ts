import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import ArticuloCantidadDto from '../models/articulo-cantidad.dto';
import ArticuloDiasDto from '../models/articulo-dias.dto';

@Injectable({
  providedIn: 'root'
})
export class InformeService {
  url: string = environment.url;
  prefix: string = environment.prefix;
  informes: string = environment.informes;

  constructor(private http: HttpClient) { }

  getArticulosMasVendidos(): Observable<ArticuloCantidadDto[]> {
    return this.http.get<ArticuloCantidadDto[]>
    (this.url + this.prefix + this.informes + "/articulos/top");
  }

  getTotalVentas(): Observable<number> {
    return this.http.get<number>
    (this.url + this.prefix + this.informes + "/ventas/total");
  }

  getArticulosConMasDias(cantidadDias: number): Observable<ArticuloDiasDto[]> {
    return this.http.get<ArticuloDiasDto[]>
    (this.url + this.prefix + this.informes + "/articulos/tiempo/" + cantidadDias);
  }

  getTotalClientes(): Observable<number> {
    return this.http.get<number>(this.url + this.prefix + this.informes + "/clientes/registrados");
  }

  getTotalAdministradores(): Observable<number> {
    return this.http.get<number>(this.url + this.prefix + this.informes + "/administradores/registrados");
  }
}
