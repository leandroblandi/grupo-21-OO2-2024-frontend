import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { ToastrService } from 'ngx-toastr';
import TokenReponse from '../../core/models/tokenResponse';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  usuario: string = "";
  clave: string = "";
  passwordInputType: string = "password";
  placeHolderPassword: string = "•••••••••";

  constructor(
    private loginService: LoginService, 
    private toast: ToastrService, 
    private router: Router, 
    private header: HeaderComponent,
    private title: Title) {

  }

  ngOnInit() {
    this.title.setTitle("Hastock :: Ingreso");
  }

  attemptLogin() {
    if(this.usuario != "" || this.clave != "") {
      this.loginService.login(this.usuario, this.clave).subscribe({
        next: (res) => {
          this.setearDatosSesion(res);
          this.toast.success(`Hola, ${res.usuario}`, "¡Bienvenido!");
          this.router.navigate(["/articulos"]);
          this.header.refresh();
        }, error: (err) => {
          
          if(err.status == 401) {
            this.toast.error("Datos incorrectos", "¡Oops!");
          } else {
            this.toast.error("Hubo un error inesperado", "¡Oops!");
          }
        }
      }); 
    } else {
      this.toast.warning("Te faltan completar datos", "¡Cuidado!");
    }
  }

  setearDatosSesion(res: TokenReponse): void {
    localStorage.setItem("token", res.token);
    localStorage.setItem("usuario", res.usuario);
  }

  togglePassword() {
    if(this.passwordInputType == "password") {
      this.passwordInputType = "text";
      this.placeHolderPassword = "1234"
    } else {
      this.passwordInputType = "password";
      this.placeHolderPassword = "•••••••••";
    }
  }
}
