# Gestión de Viajes - Frontend Angular

Aplicación Angular para gestionar destinos turísticos y turistas, consumiendo la API REST en `http://localhost:5118`.

## Requisitos
- Node.js 18+ (probado con Node 22)
- Backend API corriendo en `http://localhost:5118`

## Instalación

```powershell
cd "D:\UNIANDES\PROYECTOS APLICACIONES WEB\GestionViajes.Web\gestion-viajes"
npm install
```

## Ejecutar en desarrollo

```powershell
npm start
```

Esto levanta `ng serve` con proxy (`/api` -> `http://localhost:5118`).

## Funcionalidades
- CRUD de Destinos: listar, crear, editar, eliminar, buscar, filtrar por costo, filtrar por país.
- CRUD de Turistas: listar, crear, editar, eliminar, buscar, obtener por email.
- Notificaciones con SweetAlert2.
- UI responsive con Bootstrap 5.

## Estructura principal
- `src/app/core/models`: interfaces `Destino`, `Turista`.
- `src/app/core/services`: servicios HTTP `DestinosService`, `TuristasService`.
- `src/app/features/destinos`: componentes de lista y formulario.
- `src/app/features/turistas`: componentes de lista y formulario.

## Configuración de Proxy
Archivo `proxy.conf.json`:

```json
{
	"/api": {
		"target": "http://localhost:5118",
		"secure": false,
		"changeOrigin": true,
		"logLevel": "debug"
	}
}
```

## Notas
- Asegúrate de que el backend implemente las rutas descritas en la documentación provista.
- Si la API usa CORS custom, el proxy evita problemas en dev.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
