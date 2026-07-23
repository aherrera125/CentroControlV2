/**
 * Ejemplo de Componente
 * Este archivo sirve como referencia para crear nuevos componentes
 */

interface EjemploComponenteProps {
  titulo?: string;
  contenido?: string;
}

const EjemploComponente = ({
  titulo = "Título por defecto",
  contenido = "Contenido por defecto",
}: EjemploComponenteProps) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">{titulo}</h5>
      </div>
      <div className="card-body">
        <p className="card-text">{contenido}</p>
      </div>
    </div>
  );
};

export default EjemploComponente;
