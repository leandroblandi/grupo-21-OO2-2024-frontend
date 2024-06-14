import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../core/services/login.service';
import UsuarioRol from '../../core/models/rol';
import Rol from '../../core/models/rol';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  authenticated: boolean = false;
  username: string = "";
  rol: Rol = {
    authority: "ROLE_CLIENTE"
  };

  constructor(private loginService: LoginService, private toast: ToastrService, private router: Router) {

  }

  ngOnInit() {
    this.authenticated = this.loginService.isAuthenticated();
    this.getUserData();
  }

  logout(): void {
    this.toast.info(`Que vuelvas pronto, ${localStorage.getItem("usuario")}`, "¡Adiós!")
    this.authenticated = false;
    this.loginService.logout();
    this.router.navigate(["/iniciar-sesion"]);
  }

  getUserData(): void {
    if(this.authenticated) {
      this.rol = this.loginService.getRolUsuario();
      this.username = localStorage.getItem("usuario") ? localStorage.getItem("usuario")! : "";
    }
  }

}
