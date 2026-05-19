# CC-Backend

Este directorio contiene el backend de la aplicación CentroControlV2.

## Instalación

1. Instala dependencias:

```bash
npm install
```

2. Inicia el servidor en modo de desarrollo:

```bash
npm run dev
```

El servidor se ejecuta en `http://localhost:3000`.

Los ejemplos de uso con `curl` se encuentran en `src/StockControl.md`.

## Endpoints de typeMember

El backend expone los siguientes endpoints para el recurso `typeMember`:

### Obtener tipos de socio

- Método: `GET`
- Ruta: `/api/typeMember`
- Uso: devuelve todos los tipos de socio registrados.

### Agregar un tipo de socio

- Método: `POST`
- Ruta: `/api/typeMember`
- Body (JSON):

```json
{
  "name": "Nombre del tipo de socio"
}
```

- Uso: crea un nuevo tipo de socio.

### Actualizar un tipo de socio

- Método: `PUT`
- Ruta: `/api/typeMember/:id`
- Body (JSON):

```json
{
  "name": "Nombre actualizado"
}
```

- Uso: actualiza el nombre del tipo de socio identificado por `id`.

### Eliminar un tipo de socio

- Método: `DELETE`
- Ruta: `/api/typeMember/:id`
- Uso: elimina el tipo de socio identificado por `id`.

## Notas

- Los endpoints de creación, actualización y eliminación usan autenticación y permisos.
- El endpoint `GET /api/typeMember` actualmente devuelve todos los tipos de socio.
