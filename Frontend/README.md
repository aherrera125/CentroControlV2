# Centro Control V2 - Frontend

Frontend limpio con React 19 y Bootstrap 5.

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
├── pages/              # Páginas de la aplicación
├── layouts/            # Layouts principales
├── assets/             # Imágenes, íconos, etc.
├── App.tsx             # Componente raíz con rutas
├── main.tsx            # Punto de entrada
└── index.css           # Estilos globales
```

## 🚀 Comenzar

### Instalar dependencias
```bash
npm install
```

### Ejecutar en desarrollo
```bash
npm run dev
```

### Compilar para producción
```bash
npm run build
```

## 📦 Dependencias Principales

- **React 19**: Framework UI
- **React Router 7**: Sistema de rutas
- **Bootstrap 5**: Framework CSS
- **Vite**: Bundler y servidor de desarrollo
- **TypeScript**: Tipado estático

## 🛠️ Crear Nuevos Componentes

### Componente Funcional Simple
```tsx
// src/components/MiComponente.tsx
const MiComponente = () => {
  return (
    <div className="componente">
      <h2>Mi Componente</h2>
    </div>
  );
};

export default MiComponente;
```

### Con Props e TypeScript
```tsx
interface MiComponenteProps {
  titulo: string;
  contenido: string;
}

const MiComponente = ({ titulo, contenido }: MiComponenteProps) => {
  return (
    <div className="componente">
      <h2>{titulo}</h2>
      <p>{contenido}</p>
    </div>
  );
};

export default MiComponente;
```

## 📄 Crear Nuevas Páginas

```tsx
// src/pages/MiPagina.tsx
const MiPagina = () => {
  return (
    <div className="container py-5">
      <h1>Mi Página</h1>
    </div>
  );
};

export default MiPagina;
```

## ➕ Agregar Rutas

Edita `src/App.tsx` y agrega nuevas rutas:

```tsx
import MiPagina from "./pages/MiPagina";

// Dentro de Routes:
<Route path="/mi-pagina" element={<MiPagina />} />
```

## 🎨 Usar Bootstrap

### Clases Útiles
- `.container` - Contenedor responsive
- `.row` - Fila de grid
- `.col-md-*` - Columnas responsive
- `.btn`, `.btn-primary` - Botones
- `.card` - Tarjetas
- `.navbar` - Navegación

### Ejemplo
```tsx
<div className="container">
  <div className="row">
    <div className="col-md-6">
      <button className="btn btn-primary">Enviar</button>
    </div>
  </div>
</div>
```

## 📝 Linting

```bash
npm run lint
```

---

¡Listo para comenzar! Agrupa tus componentes en `src/components/` y tus páginas en `src/pages/`.
