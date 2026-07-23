import { useEffect, useState } from "react";

type Member = {
  id: number;
  memberNum: string;
  benefitNum: string;
  fullName: string;
  dni: string;
  phone: string;
  status: number;
  address?: string;
  salary?: number;
  typeMember?: string;
};

const pageSizeOptions = [10, 20, 50, 100];

const Socios = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [editedMember, setEditedMember] = useState<Partial<Member> | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  const loadMembers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/members");
      if (!response.ok) {
        throw new Error("No se pudieron cargar los socios.");
      }

      const payload = await response.json();
      const rawMembers = Array.isArray(payload)
        ? payload
        : Array.isArray((payload as { data?: unknown }).data)
          ? (payload as { data: Record<string, unknown>[] }).data
          : [];

      const normalizedMembers = rawMembers.map((member: Record<string, unknown>) => ({
        id: Number(member.id ?? 0),
        memberNum: String(member.memberNum ?? ""),
        benefitNum: String(member.benefitNum ?? ""),
        fullName: String(member.fullName ?? "-"),
        dni: String(member.dni ?? "-"),
        phone: member.phone ? String(member.phone) : "Sin teléfono",
        status: typeof member.status === "number" ? member.status : Number(member.status ?? 1),
        address: String(member.address ?? ""),
        salary: Number(member.salary ?? 0),
        typeMember: String(member.typeMember ?? ""),
      }));

      setMembers(normalizedMembers);
    } catch (err) {
      console.error("Error al cargar socios:", err);
      setError("No fue posible cargar la lista de socios en este momento.");
      setMembers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadMembers();

    const handleRefresh = () => {
      void loadMembers();
    };

    window.addEventListener("socios:refresh", handleRefresh);

    return () => {
      window.removeEventListener("socios:refresh", handleRefresh);
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, pageSize]);

  useEffect(() => {
    if (saveSuccess) {
      const timer = setTimeout(() => {
        setSaveSuccess(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [saveSuccess]);

  const filteredMembers = members.filter((member) => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return true;

    return (
      member.fullName.toLowerCase().includes(term) ||
      member.dni.toLowerCase().includes(term) ||
      member.benefitNum.toLowerCase().includes(term)
    );
  });

  const pageCount = Math.max(1, Math.ceil(filteredMembers.length / pageSize));

  useEffect(() => {
    if (page > pageCount) {
      setPage(pageCount);
    }
  }, [page, pageCount]);

  const openMemberDetail = (member: Member) => {
    setSaveError(null);
    setSaveSuccess(null);
    setSelectedMember(member);
    setEditedMember({
      fullName: member.fullName,
      dni: member.dni,
      benefitNum: member.benefitNum,
      phone: member.phone,
      status: member.status,
    });
  };

  const closeMemberDetail = () => {
    setSelectedMember(null);
    setEditedMember(null);
    setSaveError(null);
    setSaveSuccess(null);
  };

  const handleEditedMemberChange = (field: keyof Pick<Member, "fullName" | "dni" | "benefitNum" | "phone" | "status">, value: string) => {
    if (!editedMember) return;
    setEditedMember((current) => ({
      ...current,
      [field]: field === "status" ? Number(value) : value,
    }));
  };

  const saveMemberDetails = async () => {
    if (!selectedMember || !editedMember) return;

    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(null);

    try {
      const payloadToSend = {
        fullName: editedMember.fullName ?? selectedMember.fullName,
        benefitNum: editedMember.benefitNum ?? selectedMember.benefitNum,
        dni: editedMember.dni ?? selectedMember.dni,
        phone: editedMember.phone ?? selectedMember.phone,
        status: editedMember.status ?? selectedMember.status,
        salary: selectedMember.salary ?? 0,
        address: selectedMember.address ?? "",
      };

      const response = await fetch(`/api/members/${selectedMember.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadToSend),
      });

      if (!response.ok) {
        const errPayload = await response.json();
        throw new Error(errPayload.message ?? "No se pudo guardar el socio.");
      }

      const updatedMember: Member = {
        ...selectedMember,
        fullName: editedMember.fullName ?? selectedMember.fullName,
        benefitNum: editedMember.benefitNum ?? selectedMember.benefitNum,
        dni: editedMember.dni ?? selectedMember.dni,
        phone: editedMember.phone ?? selectedMember.phone,
        status: editedMember.status ?? selectedMember.status,
      } as Member;

      setSelectedMember(updatedMember);
      setEditedMember({
        fullName: updatedMember.fullName,
        dni: updatedMember.dni,
        benefitNum: updatedMember.benefitNum,
        phone: updatedMember.phone,
        status: updatedMember.status,
      });
      setMembers((current) =>
        current.map((item) => (item.id === updatedMember.id ? updatedMember : item)),
      );
      setSaveSuccess("Los cambios se guardaron correctamente.");
    } catch (err) {
      console.error("Error guardando socio:", err);
      setSaveError((err instanceof Error ? err.message : "No se pudieron guardar los cambios."));
    } finally {
      setIsSaving(false);
    }
  };

  const getPaginationItems = (): (number | "ellipsis")[] => {
    if (pageCount <= 10) {
      return Array.from({ length: pageCount }, (_, index) => index + 1);
    }

    const firstPages = [1, 2, 3, 4];
    const lastPages = [pageCount - 3, pageCount - 2, pageCount - 1, pageCount];

    if (page <= 4 || page >= pageCount - 3) {
      return [...firstPages, "ellipsis", ...lastPages];
    }

    const windowStart = Math.max(5, page - 1);
    const windowEnd = Math.min(pageCount - 4, page + 2);
    const windowPages = Array.from({ length: windowEnd - windowStart + 1 }, (_, index) => windowStart + index);

    return [...firstPages, "ellipsis", ...windowPages, "ellipsis", ...lastPages];
  };

  const paginationItems = getPaginationItems();
  const paginatedMembers = filteredMembers.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="container-fluid p-0">
      <div className="row g-4">
        <div className="col-12">
          <div className="card shadow-sm border-0 members-panel">
            <div className="card-body">
              <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-3 mb-4">
                <div>
                  <h2 className="h4 mb-0">Listado de socios</h2>
                </div>
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => void loadMembers()}
                >
                  <i className="bi bi-arrow-clockwise me-2" aria-hidden="true"></i>
                  Recargar
                </button>
              </div>

              <div className="row g-2 align-items-end mb-4">
                <div className="col-lg-6">
                  <label className="form-label visually-hidden" htmlFor="member-search">
                    Buscar socios
                  </label>
                  <input
                    id="member-search"
                    type="search"
                    className="form-control"
                    placeholder="Buscar por nombre, DNI o número de beneficio"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </div>
                <div className="col-sm-6 col-lg-3">
                  <label className="form-label visually-hidden" htmlFor="page-size">
                    Registros por página
                  </label>
                  <select
                    id="page-size"
                    className="form-select"
                    value={pageSize}
                    onChange={(event) => setPageSize(Number(event.target.value))}
                  >
                    {pageSizeOptions.map((size) => (
                      <option key={size} value={size}>
                        Mostrar {size}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-sm-6 col-lg-3 text-sm-end">
                  <p className="mb-0 text-muted">
                    {filteredMembers.length} resultados
                  </p>
                </div>
              </div>

              {isLoading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando socios...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="alert alert-warning mb-0" role="alert">
                  {error}
                </div>
              ) : filteredMembers.length === 0 ? (
                <div className="text-center py-5 text-muted">
                  {members.length === 0
                    ? "No hay socios registrados."
                    : `No se encontraron socios para "${searchTerm}".`}
                </div>
              ) : (
                <>
                  <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                      <thead className="table-light">
                        <tr>
                          <th scope="col" className="d-none d-md-table-cell">
                            Nº beneficio
                          </th>
                          <th scope="col">Nombre</th>
                          <th scope="col" className="d-none d-md-table-cell">
                            DNI
                          </th>
                          <th scope="col" className="d-none d-md-table-cell">
                            Teléfono
                          </th>
                          <th scope="col">Estado</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedMembers.map((member, index) => {
                          const isActive = member.status === 1;

                          return (
                            <tr key={`${member.benefitNum}-${index}`}>
                              <td className="d-none d-md-table-cell fw-semibold">
                                {member.benefitNum || "-"}
                              </td>
                              <td>{member.fullName}</td>
                              <td className="d-none d-md-table-cell">{member.dni}</td>
                              <td className="d-none d-md-table-cell">{member.phone}</td>
                              <td className="text-nowrap">
                                <div className="d-flex flex-wrap align-items-center gap-2">
                                  <span
                                    className={`badge rounded-pill ${isActive
                                        ? "bg-success-subtle text-success-emphasis"
                                        : "bg-secondary-subtle text-secondary-emphasis"
                                      }`}
                                  >
                                    {isActive ? "Activo" : "Inactivo"}
                                  </span>
                                  <button
                                    type="button"
                                    className="btn btn-outline-primary btn-sm"
                                    onClick={() => openMemberDetail(member)}
                                  >
                                    Detalle
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 mt-4">
                    <p className="mb-0 text-muted">
                      Página {page} de {pageCount}
                    </p>
                    <nav aria-label="Paginación de socios">
                      <ul className="pagination mb-0">
                        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                          <button
                            type="button"
                            className="page-link"
                            onClick={() => setPage((current) => Math.max(1, current - 1))}
                            disabled={page === 1}
                          >
                            Anterior
                          </button>
                        </li>
                        {paginationItems.map((item, index) =>
                          item === "ellipsis" ? (
                            <li key={`ellipsis-${index}`} className="page-item disabled">
                              <span className="page-link">…</span>
                            </li>
                          ) : (
                            <li key={item} className={`page-item ${item === page ? "active" : ""}`}>
                              <button
                                type="button"
                                className="page-link"
                                onClick={() => setPage(item)}
                              >
                                {item}
                              </button>
                            </li>
                          ),
                        )}
                        <li className={`page-item ${page === pageCount ? "disabled" : ""}`}>
                          <button
                            type="button"
                            className="page-link"
                            onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                            disabled={page === pageCount}
                          >
                            Siguiente
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </div>

                  {selectedMember && editedMember && (
                    <>
                      <div className="modal-backdrop fade show" />
                      <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <div>
                                <h5 className="modal-title">Detalle del socio</h5>
                                <p className="small text-muted mb-0">ID: {selectedMember.id}</p>
                              </div>
                              <button
                                type="button"
                                className="btn-close"
                                aria-label="Cerrar"
                                onClick={closeMemberDetail}
                              />
                            </div>
                            <div className="modal-body">
                              <div className="row gy-3">
                                <div className="col-12 col-md-6">
                                  <label className="form-label">Nombre</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={editedMember.fullName ?? ""}
                                    onChange={(event) => handleEditedMemberChange("fullName", event.target.value)}
                                  />
                                </div>
                                <div className="col-12 col-md-6">
                                  <label className="form-label">DNI</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={editedMember.dni ?? ""}
                                    onChange={(event) => handleEditedMemberChange("dni", event.target.value)}
                                  />
                                </div>
                                <div className="col-12 col-md-6">
                                  <label className="form-label">Número de beneficio</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={editedMember.benefitNum ?? ""}
                                    onChange={(event) => handleEditedMemberChange("benefitNum", event.target.value)}
                                  />
                                </div>
                                <div className="col-12 col-md-6">
                                  <label className="form-label">Teléfono</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={editedMember.phone ?? ""}
                                    onChange={(event) => handleEditedMemberChange("phone", event.target.value)}
                                  />
                                </div>
                                <div className="col-12 col-md-6">
                                  <label className="form-label">Estado</label>
                                  <select
                                    className="form-select"
                                    value={String(editedMember.status ?? 1)}
                                    onChange={(event) => handleEditedMemberChange("status", event.target.value)}
                                  >
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
                                  </select>
                                </div>
                                <div className="col-12 col-md-6">
                                  <label className="form-label">Número de socio</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={selectedMember.memberNum || ""}
                                    readOnly
                                  />
                                </div>
                                <div className="col-12 col-md-6">
                                  <label className="form-label">Tipo de socio</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={selectedMember.typeMember ?? ""}
                                    readOnly
                                  />
                                </div>
                                <div className="col-12 col-md-6">
                                  <label className="form-label">Dirección</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={selectedMember.address ?? ""}
                                    readOnly
                                  />
                                </div>
                              </div>
                              {saveError && (
                                <div className="alert alert-danger mt-3" role="alert">
                                  {saveError}
                                </div>
                              )}
                              {saveSuccess && (
                                <div className="alert alert-success mt-3" role="alert">
                                  {saveSuccess}
                                </div>
                              )}
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" onClick={closeMemberDetail}>
                                Cerrar
                              </button>
                              <button type="button" className="btn btn-primary" onClick={saveMemberDetails} disabled={isSaving}>
                                {isSaving ? "Guardando..." : "Guardar cambios"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Socios;

