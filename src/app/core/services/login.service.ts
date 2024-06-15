import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import TokenReponse from '../models/tokenResponse';
import { JwtHelperService } from '@auth0/angular-jwt';
import Rol from '../models/rol';
import Usuario from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = environment.url;
  private prefix: string = environment.prefix;
  private loginUrl: string = environment.login;
  private usuarios: string = environment.usuarios;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
  }
  
  login(usuario: string, clave: string): Observable<TokenReponse> {
    const dto = {
      usuario: usuario,
      clave: clave
    }
    return this.http.post<TokenReponse>(this.url + this.prefix + this.loginUrl, dto);
  }

  register(dto: { usuario: string; clave: string; nombre: string; apellido: string; dni: number; }): Observable<Usuario> {
    return this.http.post<Usuario>(this.url + this.prefix + this.usuarios, dto);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout(): void {
    localStorage.clear();
  }

  getRolUsuario(): Rol {
    const token = localStorage.getItem("token")!;
    const decodedToken = this.jwtHelper.decodeToken(token);
    return JSON.parse(decodedToken.authorities)[0];
  } 
}
