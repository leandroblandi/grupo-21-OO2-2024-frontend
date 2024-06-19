# Trabajo práctico cuatrimestral - Orientación a Objetos II

Este es un proyecto de Angular 17. A continuación, se detallan los pasos necesarios para levantar el proyecto por primera vez, así como algunas instrucciones útiles para el desarrollo y el despliegue.

## Requisitos

Antes de empezar, asegúrate de tener instaladas las siguientes herramientas:

- [Node.js](https://nodejs.org/) (Versión 20)
- [Angular CLI](https://angular.io/cli) (Versión 17)
- [Git](https://git-scm.com/)

## Instalación

1.  **Clonar el repositorio.** Clona el repositorio en tu máquina local usando `git clone [url]`:
    ```bash
    git clone https://github.com/leandroblandi/grupo-21-OO2-2024-frontend.git
    ```

2.  **Cambiarse a la carpeta del proyecto en la terminal.** Navega al directorio del proyecto utilizando el comando `cd`:
    ```bash
    cd grupo-21-OO2-2024-frontend
    ```
3.  **Instalar dependencias.** Usa el comando `npm` para instalar las dependencias del proyecto.
    ```bash
    npm install
    ```

    El mismo instalará entre otras, las siguientes dependencias:
    - NGX Toastr
    - Angular JWT
    - Angular Animations
5.  **Levantar el proyecto.** Para levantar el proyecto en un entorno de desarrollo, ejecuta el siguiente comando:
     ```bash
     npm start
     ```
    El proyecto estará disponible en http://localhost:4200/.

## Uso de la aplicación
**El primer paso para utilizar la aplicación, es iniciar sesión.** La misma aplicación te redigirirá a la vista de inicio de sesión. Si quieres ver las funcionalidades de administrador, inicia sesión con los siguientes datos:
  - **Usuario:** dummy
  - **Clave:** 1234

Si deseas utilizar la aplicación como cliente, puedes registrarte o en su defecto utilizar las siguientes credenciales:
  - **Usuario:** mcarreira
  - **Clave:** 1234

### Permisos de la aplicación
Se configuró la aplicación de forma que restringa o permita acceder a ciertas secciones según los roles que el usuario posea. Se detalla a continuación qué cosas puedes hacer según tu rol:
- **Rol de administrador:**
  - Ver informes sobre stock, ventas, clientes y demás
  - Alta, baja y aprovisionamiento de Lotes de artículos
  - Alta, baja y modificación de Artículos
  - Ver y eliminar clientes


- **Rol de cliente:**
  - Ver los artículos disponibles para la compra
  - Realizar compras de varios artículos
  - Ver las compras realizadas

- **Visitante:**
  - Iniciar sesión
  - Registrarse

## Rutas de la aplicación
La aplicación posee una buena lista de rutas que se enlazan con diferentes componentes. Las mismas están restringidas según los roles. Un cliente no podrá acceder a varias de ellas. Mientras que un visitante, no podrá acceder a ninguna, excepto la de iniciar-sesion y la de registrarse. A continuación se listan las diferentes rutas:

- **Ruta por defecto.** La misma te redirige a la vista de inicio de sesión si no estás identificado; caso contrario, te redirige al listado de artículos
  - http://localhost:4200
 
- **Inicio de sesión y registro.** Cualquiera puede acceder. Dato interesante: si ya tienes una sesión activa, no podrás entrar a estas vistas:
  - http://localhost:4200/iniciar-sesion
  - http://localhost:4200/registrarse
    
- **Lotes de artículos.** Solo puede ser accedida por administradores:
  - http://localhost:4200/lotes
  - http://localhost:4200/alta-lote
  
- **Artículos.** Algunas están permitidas para los clientes, mientras que otras solo se permiten para administradores:
  - http://localhost:4200/articulos
  - http://localhost:4200/alta-articulo
  - http://localhost:4200/editar-articulo/{ID_ARTICULO}
  - http://localhost:4200/carrito
  - http://localhost:4200/mis-compras
    
- **Clientes.** Solo puede ser accedida por administradores:
  - http://localhost:4200/clientes
 
- **Informes.** Solo puede ser accedida por administradores:
  - http://localhost:4200/informes
