import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../core/services/login.service';
import { ToastrService } from 'ngx-toastr';
import TokenReponse from '../../core/models/tokenResponse';
import { Router, RouterModule } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  nombres: string = "";
  apellidos: string = "";
  documento: number = 0;
  usuario: string = "";
  clave: string = "";

  constructor(
    private loginService: LoginService, 
    private toast: ToastrService, 
    private router: Router,
    private title: Title
    
  ) {

  }

  ngOnInit() {
    this.title.setTitle("Hastock :: Registro");
  }

  attemptRegister() {
    if(this.nombres != ""
      || this.apellidos != ""
      || this.documento > 0
      || this.usuario != "" 
      || this.clave != "") {
        const dto = {
          usuario: this.usuario,
          clave: this.clave,
          nombre: this.nombres,
          apellido: this.apellidos,
          dni: this.documento
        }

        this.loginService.register(dto).subscribe({
          next: (res) => {
            this.toast.success(`Para continuar, ${this.nombres}, debes iniciar sesión`, "¡Registro exitoso!");
            this.router.navigate(["/iniciar-sesion"]);
          }, error: (err) => {

            if(err.status == 400) {
              this.toast.error(`Hubo un problema: ${err.error.details}`, "¡Oops!");
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
}
