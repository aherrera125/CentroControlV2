import { useEffect, useState } from "react";
import type { FormEvent } from "react";

type TypeMember = {
  id: number;
  name: string;
};

const TipoSocio = () => {
  const [typeMembers, setTypeMembers] = useState<TypeMember[]>([]);
  const [name, setName] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [isNameInvalid, setIsNameInvalid] = useState(false);

  const loadTypeMembers = async () => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const response = await fetch("/api/typeMember");
      if (!response.ok) {
        throw new Error("No se pudieron cargar los tipos de socio.");
      }

      const payload: unknown = await response.json();
      const types = Array.isArray(payload)
        ? payload
        : Array.isArray((payload as { data?: unknown }).data)
          ? (payload as { data: TypeMember[] }).data
          : [];

      setTypeMembers(
        types.map((type) => ({
          id: Number(type.id),
          name: String(type.name ?? ""),
        })),
      );
    } catch (error) {
      console.error("Error al cargar tipos de socio:", error);
      setTypeMembers([]);
      setLoadError("No fue posible cargar los tipos de socio en este momento.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadTypeMembers();
  }, []);

  useEffect(() => {
    if (!saveSuccess) return;

    const timer = window.setTimeout(() => setSaveSuccess(null), 3000);
    return () => window.clearTimeout(timer);
  }, [saveSuccess]);

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaveError(null);
    setSaveSuccess(null);

    const trimmedName = name.trim();
    if (!trimmedName) {
      setIsNameInvalid(true);
      return;
    }

    setIsNameInvalid(false);
    setIsSaving(true);

    try {
      const isEditing = selectedTypeId !== null;
      const response = await fetch(
        isEditing ? `/api/typeMember/${selectedTypeId}` : "/api/typeMember",
        {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName }),
        },
      );

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.message ?? "No se pudo guardar el tipo de socio.");
      }

      setName("");
      setSelectedTypeId(null);
      setSaveSuccess(
        isEditing
          ? "Los datos se actualizaron correctamente."
          : "Los datos se guardaron correctamente.",
      );
      await loadTypeMembers();
    } catch (error) {
      console.error("Error al guardar tipo de socio:", error);
      setSaveError(error instanceof Error ? error.message : "No se pudieron guardar los datos.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    setName("");
    setSelectedTypeId(null);
    setIsNameInvalid(false);
    setSaveError(null);
    setSaveSuccess(null);
  };

  const handleDelete = async () => {
    if (selectedTypeId === null) return;

    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(null);

    try {
      const response = await fetch(`/api/typeMember/${selectedTypeId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.message ?? "No se pudo eliminar el tipo de socio.");
      }

      setName("");
      setSelectedTypeId(null);
      setSaveSuccess("El tipo de socio se eliminó correctamente.");
      await loadTypeMembers();
    } catch (error) {
      console.error("Error al eliminar tipo de socio:", error);
      setSaveError(error instanceof Error ? error.message : "No se pudo eliminar el tipo de socio.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSelectType = (type: TypeMember) => {
    setSelectedTypeId(type.id);
    setName(type.name);
    setIsNameInvalid(false);
    setSaveError(null);
    setSaveSuccess(null);
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-4">
        <div className="col-12">
          <div className="card shadow-sm border-0 members-panel">
            <div className="card-body">
              <div className="row g-4">
                <div className="col-12 col-lg-7">
                  <div className="border rounded-3 h-100 p-3">
                    <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                      <h3 className="h6 mb-0">Tipos de socio registrados</h3>
                      <button
                        type="button"
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => void loadTypeMembers()}
                        disabled={isLoading}
                      >
                        <i className="bi bi-arrow-clockwise me-2" aria-hidden="true" />
                        Recargar
                      </button>
                    </div>

                    {isLoading ? (
                      <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                          <span className="visually-hidden">Cargando tipos de socio...</span>
                        </div>
                      </div>
                    ) : loadError ? (
                      <div className="alert alert-warning mb-0" role="alert">{loadError}</div>
                    ) : typeMembers.length === 0 ? (
                      <p className="text-muted text-center py-5 mb-0">No hay tipos de socio registrados.</p>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                          <thead className="table-light">
                            <tr><th scope="col">Nombre</th></tr>
                          </thead>
                          <tbody>
                            {typeMembers.map((type) => (
                              <tr
                                key={type.id}
                                className={selectedTypeId === type.id ? "table-primary" : ""}
                                role="button"
                                tabIndex={0}
                                onClick={() => handleSelectType(type)}
                                onKeyDown={(event) => {
                                  if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    handleSelectType(type);
                                  }
                                }}
                              >
                                <td>{type.name}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-12 col-lg-5">
                  <div className="border rounded-3 h-100 p-3">
                    <h3 className="h6 mb-3">
                      {selectedTypeId === null ? "Nuevo tipo de socio" : "Editar tipo de socio"}
                    </h3>
                    <form noValidate onSubmit={handleSave}>
                      <label className="form-label fw-semibold" htmlFor="type-member-name">
                        Nombre <span className="text-danger">*</span>
                      </label>
                      <input
                        id="type-member-name"
                        type="text"
                        className={`form-control ${isNameInvalid ? "is-invalid" : ""}`}
                        value={name}
                        onChange={(event) => {
                          setName(event.target.value);
                          if (isNameInvalid) setIsNameInvalid(false);
                        }}
                        placeholder="Ingrese el tipo de socio"
                        disabled={isSaving}
                      />
                      {isNameInvalid && (
                        <div className="invalid-feedback d-block"><small>Este campo es obligatorio</small></div>
                      )}
                      {saveError && <div className="alert alert-danger mt-3 mb-0" role="alert">{saveError}</div>}

                      <div className="d-flex flex-wrap gap-2 mt-4">
                        <button type="submit" className="btn btn-primary" disabled={isSaving}>
                          {isSaving ? <><span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />Guardando...</> : <><i className="bi bi-check-lg me-2" />Guardar</>}
                        </button>
                        {selectedTypeId !== null && (
                          <button type="button" className="btn btn-outline-danger" onClick={() => void handleDelete()} disabled={isSaving}>
                            <i className="bi bi-trash me-2" />Eliminar
                          </button>
                        )}
                        <button type="button" className="btn btn-outline-secondary" onClick={handleClear} disabled={isSaving}>
                          <i className="bi bi-arrow-clockwise me-2" />Limpiar
                        </button>
                        {saveSuccess && <span className="text-success align-self-center" role="status"><i className="bi bi-check-circle me-2" />{saveSuccess}</span>}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipoSocio;
