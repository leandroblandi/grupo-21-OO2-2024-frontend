import UsuarioRol from "./rol";

export default interface Usuario{
	idUsuario : number;
	usuario : String ;
	clave : String;
	nombre : String ;	
	apellido : String ;	
	dni : number;	
	rol : UsuarioRol;
	activo : boolean;
	fechaCreacion : Date;
	fechaActualizacion : Date;
}