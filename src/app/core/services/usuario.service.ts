import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Usuario from '../models/usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  url: string = environment.url;
  prefix: string = environment.prefix;
  usuarios: string = environment.usuarios;

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url + this.prefix + this.usuarios);
  }

  getUsuario(usuario: string): Observable<Usuario>{
    return this.http.get<Usuario>(this.url + this.prefix + this.usuarios + "/" + usuario);
  }

}
