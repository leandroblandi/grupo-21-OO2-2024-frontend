import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../core/services/usuario.service';
import Usuario from '../../core/models/usuario';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listado-clientes',
  standalone: true,
  imports: [],
  templateUrl: './listado-clientes.component.html',
  styleUrl: './listado-clientes.component.css'
})
export class ListadoClientesComponent implements OnInit {

  usuarios: Usuario[] = [];
  ningunUsuarioActivo: boolean = true;
  
  constructor(
    private usuarioService: UsuarioService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    this.getUsuarios();
    this.actualizarListClientes();
  }

  getUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (res) => {
        console.log(res);
        this.usuarios = this.filtrarClientes(res);
        this.actualizarListClientes();
      }, error: (err) => {
        console.log(err);
        this.toast.error("Hubo un error al obtener los clientes", "¡Oops!")
      }
    });
  }

  filtrarClientes(usuarios: Usuario[]) {
    return usuarios.filter((usuario: any) => usuario.rol.rol == "ROLE_CLIENTE");
  }

  actualizarListClientes(): void {
    let algunUsuarioActivo: boolean = false;
    
    for(let usuario of this.usuarios) {
      if(usuario.activo) {
        algunUsuarioActivo = true;
      }
    }
    this.ningunUsuarioActivo = !algunUsuarioActivo;
  }
}
