const Home = () => {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-12">
          <h1 className="mb-4">Bienvenido a Centro Control V2</h1>
          <p className="lead">
            Esta es tu base limpia para comenzar el desarrollo del frontend.
          </p>
          
          <div className="alert alert-info" role="alert">
            <strong>Información:</strong> Estructura lista para agregar componentes y rutas.
          </div>

          <div className="row mt-4">
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">React 19</h5>
                  <p className="card-text">Última versión de React configurada y lista para usar.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Bootstrap 5</h5>
                  <p className="card-text">Framework CSS integrado para estilos responsivos.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">React Router</h5>
                  <p className="card-text">Sistema de rutas configurado para navegación.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
