import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { ToastrService } from 'ngx-toastr';
import TokenReponse from '../../core/models/tokenResponse';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario: string = "";
  clave: string = "";

  constructor(
    private loginService: LoginService, 
    private toast: ToastrService, 
    private router: Router, 
    private header: HeaderComponent) {

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
    }
  }

  setearDatosSesion(res: TokenReponse): void {
    localStorage.setItem("token", res.token);
    localStorage.setItem("usuario", res.usuario);
  }
}
