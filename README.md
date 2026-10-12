# Centro Control V2

Aplicación para la administración de socios de un centro de jubilados. El proyecto está dividido en un frontend React/TypeScript y un backend Express/TypeScript conectado a MySQL.

## Contenido

- [Frontend](./Frontend/README.md)
- [Backend](./Backend/README.md)
- [Documentación de la API y ejemplos `curl`](./Backend/src/StockControl.md)

## Requisitos

- Node.js y npm.
- MySQL con la base de datos y las tablas requeridas por la aplicación.

## Configuración inicial

1. Configura las variables de conexión a MySQL y las variables del servidor en `Backend/.env`. Usa `Backend/.env.example` como referencia; reemplaza sus valores por los de tu entorno y no compartas ni subas credenciales.
2. Instala las dependencias de ambos proyectos:

   ```bash
   cd Backend
   npm install
   cd ../Frontend
   npm install
   ```

3. Inicia el backend y el frontend en terminales separadas:

   ```bash
   cd Backend
   npm run dev
   ```

   ```bash
   cd Frontend
   npm run dev
   ```

   El backend escucha en `http://localhost:3000`. El servidor de desarrollo de Vite reenvía las llamadas `/api` a ese backend.

## Funcionalidades

- Gestión y búsqueda de socios.
- Alta y mantenimiento de tipos de socio.
- Registro de pagos, historial por socio, detalle editable y eliminación con confirmación.
- Reportes de socios y pagos.
- Administración de usuarios.

La aplicación web se ejecuta desde Vite durante el desarrollo. Las rutas disponibles se encuentran en `Frontend/src/App.tsx`.

## Comprobaciones

```bash
cd Backend
npm run build
```

```bash
cd Frontend
npm run build
npm run lint
```

Consulta los README de cada paquete para más detalles de ejecución y desarrollo.
