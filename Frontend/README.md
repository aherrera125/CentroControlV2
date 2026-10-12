# Frontend - Centro Control V2

Interfaz de usuario construida con React 19, TypeScript, React Router, Bootstrap 5 y Vite. Durante el desarrollo, Vite reenvía las solicitudes `/api` al backend en `http://localhost:3000` (configurado en `vite.config.ts`).

## Requisitos

- Node.js y npm.
- Backend activo y conectado a MySQL para utilizar las funciones que consumen la API.

## Instalación y ejecución

```bash
npm install
npm run dev
```

Vite muestra en la terminal la URL local de la aplicación.

## Comandos

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor local de Vite. |
| `npm run build` | Comprueba TypeScript y crea la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente la última compilación de `dist/`. |
| `npm run lint` | Ejecuta ESLint sobre el frontend. |

## Pantallas

Las rutas están definidas en `src/App.tsx`:

| Ruta | Función |
| --- | --- |
| `/` y `/socios` | Consulta y mantenimiento de socios. |
| `/nuevo-socio` | Alta de socio. |
| `/tipo-socio` | Administración de tipos de socio. |
| `/pagos` | Registro de pagos e historial filtrado por socio; permite abrir el detalle editable y eliminar pagos con confirmación. |
| `/reporte-pagos` | Reporte de pagos. |
| `/reporte-socios` | Reporte de socios. |
| `/usuarios` | Consulta y administración de usuarios. |
| `/alta-usuarios` | Alta de usuario. |

## Estructura

```text
src/
├── assets/       # Recursos estáticos y estilos
├── components/   # Pantallas y componentes de la aplicación
├── App.tsx       # Rutas
└── main.tsx      # Punto de entrada
```

Las solicitudes de datos se realizan a través de las rutas `/api` del backend. Para iniciar el backend, configurar MySQL y consultar los endpoints, sigue la [guía del backend](../Backend/README.md).
