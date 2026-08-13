import { useEffect, useState, useMemo } from "react";

type Member = {
  id: number;
  benefitNum: string;
  fullName: string;
  dni: string;
  typeMember: string;
  typeMemberId: number;
  phone: string;
  address: string;
  status: number;
};

type TypeMember = {
  id: number;
  name: string;
};

const pageSizeOptions = [10, 20, 50, 100];

const ReporteSocios = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [typeMembers, setTypeMembers] = useState<TypeMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTypeId, setSelectedTypeId] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const loadMembers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/members");
      if (!response.ok) throw new Error("No se pudieron cargar los socios.");

      const payload: any = await response.json();
      const data = Array.isArray(payload) ? payload : (payload.data || []);

      setMembers(
        data
          .map((m: any) => ({
            id: Number(m.id || 0),
            benefitNum: String(m.benefitNum || "-"),
            fullName: String(m.fullName || ""),
            dni: String(m.dni || "-"),
            typeMember: String(m.typeMember || "-"),
            typeMemberId: Number(m.typeMemberId || 0),
            phone: String(m.phone || "-"),
            address: String(m.address || "-"),
            status: Number(m.status ?? 0),
          }))
          .filter((m: Member) => m.status === 1)
      );
    } catch (err) {
      console.error("Error al cargar socios:", err);
      setError("No fue posible cargar el reporte de socios.");
    } finally {
      setIsLoading(false);
    }
  };

  const loadTypeMembers = async () => {
    setIsLoadingTypes(true);
    try {
      const response = await fetch("/api/typeMember");
      if (!response.ok) throw new Error("No se pudieron cargar los tipos de socio.");
      const payload: any = await response.json();
      const data = Array.isArray(payload) ? payload : (payload.data || []);
      setTypeMembers(data.map((t: any) => ({ id: Number(t.id), name: String(t.name) })));
    } catch (err) {
      console.error("Error al cargar tipos de socio:", err);
    } finally {
      setIsLoadingTypes(false);
    }
  };

  useEffect(() => {
    void loadMembers();
    void loadTypeMembers();
  }, []);

  const filteredMembers = useMemo(() => {
    return members
      .filter((m) => {
        const matchesType = selectedTypeId === "all" || m.typeMemberId === Number(selectedTypeId);
        return matchesType;
      });
  }, [members, selectedTypeId]);

  const pageCount = Math.max(1, Math.ceil(filteredMembers.length / pageSize));

    useEffect(() => {
    setPage(1);
  }, [selectedTypeId, pageSize]);

  const paginatedMembers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredMembers.slice(start, start + pageSize);
  }, [filteredMembers, page, pageSize]);

  const exportToPdf = () => {
    const typeLabel =
      selectedTypeId === "all"
        ? "Todos los tipos de socio"
        : typeMembers.find((t) => t.id === Number(selectedTypeId))?.name || "-";

    const rows = filteredMembers
      .map(
        (m) => `
        <tr>
          <td>${m.benefitNum}</td>
          <td>${m.fullName}</td>
          <td>${m.dni}</td>
          <td>${m.typeMember}</td>
          <td>${m.phone}</td>
          <td>${m.address}</td>
        </tr>`
      )
      .join("");

    const win = window.open("", "_blank", "width=900,height=650");
    if (!win) return;

    win.document.write(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8" />
        <title>Reporte de Socios</title>
        <style>
          body { font-family: Arial, sans-serif; color: #212529; margin: 24px; }
          h2 { margin: 0 0 4px; }
          .subtitle { color: #6c757d; margin: 0 0 16px; font-size: 14px; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th, td { border: 1px solid #dee2e6; padding: 6px 8px; text-align: left; }
          th { background: #f8f9fa; }
          tr:nth-child(even) { background: #f8f9fa; }
        </style>
      </head>
      <body>
        <h2>Reporte de Socios</h2>
        <p class="subtitle">Tipo de socio: ${typeLabel} · Total: ${filteredMembers.length} socios</p>
        <table>
          <thead>
            <tr>
              <th>N° Beneficio</th>
              <th>Apellido y Nombre</th>
              <th>DNI</th>
              <th>Tipo</th>
              <th>Teléfono</th>
              <th>Dirección</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </body>
      </html>
    `);

    win.document.close();
    win.focus();
    win.print();
  };

  const getPaginationItems = (): (number | "ellipsis")[] => {
    if (pageCount <= 10) return Array.from({ length: pageCount }, (_, i) => i + 1);
    const firstPages = [1, 2, 3];
    const lastPages = [pageCount - 2, pageCount - 1, pageCount];
    if (page <= 3 || page >= pageCount - 2) return [...firstPages, "ellipsis", ...lastPages];
    return [1, "ellipsis", page - 1, page, page + 1, "ellipsis", pageCount];
  };

    return (
    <div className="container-fluid p-0">
      <div className="card shadow-sm border-0">
        <div className="card-body">         

          <div className="row g-3 mb-4">
            <div className="col-12 col-md-5">
              <label className="form-label small fw-bold">Filtrar por Tipo de Socio</label>
              <select
                className="form-select"
                value={selectedTypeId}
                onChange={(e) => setSelectedTypeId(e.target.value)}
                disabled={isLoadingTypes}
              >
                <option value="all">Todos los tipos de socio</option>
                {typeMembers.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            <div className="col-6 col-md-3">
              <label className="form-label small fw-bold">Registros por página</label>
              <select
                className="form-select"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {pageSizeOptions.map((opt) => (
                  <option key={opt} value={opt}>Mostrar {opt}</option>
                ))}
              </select>
            </div>
                        <div className="col-6 col-md-4 d-flex align-items-end justify-content-end gap-2">
              <button 
                className="btn btn-outline-primary btn-sm d-flex align-items-center" 
                style={{ height: "38px" }}
                onClick={() => void loadMembers()} 
                disabled={isLoading}
              >
                <i className="bi bi-arrow-clockwise me-2"></i>Actualizar
              </button>
              <button
                className="btn btn-outline-primary btn-sm d-flex align-items-center"
                style={{ height: "38px" }}
                onClick={exportToPdf}
                disabled={isLoading || filteredMembers.length === 0}
              >
                <i className="bi bi-file-earmark-pdf me-2"></i>Exportar
              </button>
              <span 
                className="badge bg-primary-subtle text-primary border border-primary-subtle d-flex align-items-center px-3"
                style={{ height: "38px", fontSize: "0.9rem" }}
              >
                {filteredMembers.length} socios
              </span>
            </div>
          </div>



































          {isLoading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Cargando...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-warning" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>{error}
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="text-center py-5 bg-light rounded-3">
              <i className="bi bi-people text-muted display-4 d-block mb-3"></i>
              <p className="text-muted">No se encontraron socios activos con los filtros aplicados.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle border-top">
                <thead className="table-light">
                  <tr>
                    <th>N° Beneficio</th>
                    <th>Apellido y Nombre</th>
                    <th>DNI</th>
                    <th>Tipo</th>
                    <th>Teléfono</th>
                    <th>Dirección</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMembers.map((member) => (
                    <tr key={member.id}>
                      <td className="fw-bold text-primary">{member.benefitNum}</td>
                                            <td>{member.fullName}</td>
                      <td>{member.dni}</td>
                      <td>
                        <span className="badge bg-info-subtle text-info border border-info-subtle">
                          {member.typeMember}
                        </span>
                      </td>
                      <td>{member.phone}</td>
                      <td className="text-truncate" style={{ maxWidth: "200px" }}>
                        {member.address}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!isLoading && !error && filteredMembers.length > 0 && (
            <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 mt-4 pt-3 border-top">
              <div className="text-muted small">
                Página <strong>{page}</strong> de {pageCount}
              </div>
              <nav aria-label="Paginación de reporte">
                <ul className="pagination pagination-sm mb-0">
                  <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      Anterior
                    </button>
                  </li>
                  {getPaginationItems().map((item, idx) => (
                    item === "ellipsis" ? (
                      <li key={`ell-${idx}`} className="page-item disabled"><span className="page-link">...</span></li>
                    ) : (
                      <li key={item} className={`page-item ${item === page ? "active" : ""}`}>
                        <button type="button" className="page-link" onClick={() => setPage(item)}>
                          {item}
                        </button>
                      </li>
                    )
                  ))}
                  <li className={`page-item ${page === pageCount ? "disabled" : ""}`}>
                    <button
                      type="button"
                      className="page-link"
                      onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                      disabled={page === pageCount}
                    >
                      Siguiente
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReporteSocios;
