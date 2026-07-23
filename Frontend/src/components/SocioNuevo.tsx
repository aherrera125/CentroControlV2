import { useEffect, useState } from "react";

interface TypeMember {
  id: number;
  name: string;
}

const SocioNuevo = () => {
  const [formData, setFormData] = useState({
    benefitNum: "",
    fullName: "",
    dni: "",
    birthDate: "",
    phone: "",
    enrollmentDate: new Date().toISOString().split("T")[0],
    salary: "",
    address: "",
    typeMemberId: "",
  });

  const [typeMembers, setTypeMembers] = useState<TypeMember[]>([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(true);
  const [typesError, setTypesError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, boolean>>({});

  // Cargar tipos de socio al montar el componente
  useEffect(() => {
    const loadTypeMembers = async () => {
      setIsLoadingTypes(true);
      setTypesError(null);
      try {
        const response = await fetch("/api/typeMember");
        if (!response.ok) {
          throw new Error("No se pudieron cargar los tipos de socio.");
        }
        const data = await response.json();
        const types = Array.isArray(data) ? data : data.data || [];
        setTypeMembers(types);
      } catch (err) {
        console.error("Error al cargar tipos de socio:", err);
        setTypesError("No fue posible cargar los tipos de socio.");
        setTypeMembers([]);
      } finally {
        setIsLoadingTypes(false);
      }
    };

    void loadTypeMembers();
  }, []);

  const handleInputChange = (
    field: keyof typeof formData,
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, boolean> = {};

    if (!formData.benefitNum.trim()) errors.benefitNum = true;
    if (!formData.fullName.trim()) errors.fullName = true;
    if (!formData.dni.trim()) errors.dni = true;
    if (!formData.birthDate.trim()) errors.birthDate = true;
    if (!formData.phone.trim()) errors.phone = true;
    if (!formData.enrollmentDate.trim()) errors.enrollmentDate = true;
    if (!formData.salary.trim()) errors.salary = true;
    if (!formData.address.trim()) errors.address = true;
    if (!formData.typeMemberId) errors.typeMemberId = true;

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = async () => {
    setSaveError(null);
    setSaveSuccess(null);

    if (!validateForm()) {
      setSaveError(null);
      return;
    }

    setIsSaving(true);

    try {

      const payloadToSend = {
        typeMemberId: Number(formData.typeMemberId),
        memberNum: Number(formData.benefitNum) || 0,
        benefitNum: formData.benefitNum,
        fullName: formData.fullName,
        dni: formData.dni,
        dateOfBirth: formData.birthDate,
        phone: formData.phone,
        status: 1,
        dateAdmission: formData.enrollmentDate,
        salary: Number(formData.salary) || 0,
        address: formData.address,
      };

      const response = await fetch("/api/members", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadToSend),
      });

      if (!response.ok) {
        const errPayload = await response.json();
        throw new Error(errPayload.message ?? "No se pudo guardar el socio.");
      }

      setSaveSuccess("Los datos se guardaron correctamente");
      setTimeout(() => {
        setSaveSuccess(null);
      }, 3000);

      // Limpiar el formulario después de guardar, conservando el aviso de éxito.
      handleClear(true);
    } catch (err) {
      console.error("Error guardando socio:", err);
      setSaveError((err instanceof Error ? err.message : "No se pudieron guardar los datos."));
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = (preserveSuccess = false) => {
    setFormData({
      benefitNum: "",
      fullName: "",
      dni: "",
      birthDate: "",
      phone: "",
      enrollmentDate: new Date().toISOString().split("T")[0],
      salary: "",
      address: "",
      typeMemberId: "",
    });
    if (!preserveSuccess) setSaveSuccess(null);
    setSaveError(null);
    setFieldErrors({});
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-4">
        <div className="col-12">
          <div className="card shadow-sm border-0 members-panel">
            <div className="card-body">
              <div className="mb-4">
                <h2 className="h4 mb-0">Socio Nuevo</h2>
              </div>

              {typesError && (
                <div className="alert alert-warning mb-3" role="alert">
                  {typesError}
                </div>
              )}

              <form noValidate>
                <div className="row gy-4">
                  <div className="col-12">
                    <div className="row gy-3">
                      <div className="col-12 col-lg-6">
                        <label className="form-label fw-semibold">
                          Nombre completo <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${fieldErrors.fullName ? "is-invalid" : ""}`}
                          value={formData.fullName}
                          onChange={(event) =>
                            handleInputChange("fullName", event.target.value)
                          }
                          placeholder="Nombre y apellido"
                        />
                        {fieldErrors.fullName && (
                          <div className="invalid-feedback d-block">
                            <small>Este campo es obligatorio</small>
                          </div>
                        )}
                      </div>

                      <div className="col-12 col-lg-6">
                        <label className="form-label fw-semibold">
                          DNI <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${fieldErrors.dni ? "is-invalid" : ""}`}
                          value={formData.dni}
                          onChange={(event) =>
                            handleInputChange("dni", event.target.value)
                          }
                          placeholder="Ej: 12345678"
                        />
                        {fieldErrors.dni && (
                          <div className="invalid-feedback d-block">
                            <small>Este campo es obligatorio</small>
                          </div>
                        )}
                      </div>

                      <div className="col-12 col-lg-6">
                        <label className="form-label fw-semibold">
                          Número de beneficio <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${fieldErrors.benefitNum ? "is-invalid" : ""}`}
                          value={formData.benefitNum}
                          onChange={(event) =>
                            handleInputChange("benefitNum", event.target.value)
                          }
                          placeholder="Ej: 12345"
                        />
                        {fieldErrors.benefitNum && (
                          <div className="invalid-feedback d-block">
                            <small>Este campo es obligatorio</small>
                          </div>
                        )}
                      </div>

                      <div className="col-12 col-lg-6">
                        <label className="form-label fw-semibold">
                          Tipo de socio <span className="text-danger">*</span>
                        </label>
                        {isLoadingTypes ? (
                          <div className="input-group">
                            <span className="input-group-text">
                              <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Cargando...</span>
                              </div>
                            </span>
                            <select className="form-select" disabled>
                              <option>Cargando tipos de socio...</option>
                            </select>
                          </div>
                        ) : (
                          <>
                            <select
                              className={`form-select ${fieldErrors.typeMemberId ? "is-invalid" : ""}`}
                              value={formData.typeMemberId}
                              onChange={(event) =>
                                handleInputChange("typeMemberId", event.target.value)
                              }
                            >
                              <option value="">Seleccionar tipo de socio</option>
                              {typeMembers.map((type) => (
                                <option key={type.id} value={type.id}>
                                  {type.name}
                                </option>
                              ))}
                            </select>
                            {fieldErrors.typeMemberId && (
                              <div className="invalid-feedback d-block">
                                <small>Este campo es obligatorio</small>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="row gy-3">
                      <div className="col-12 col-lg-6">
                        <label className="form-label fw-semibold">
                          Fecha de nacimiento <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          className={`form-control ${fieldErrors.birthDate ? "is-invalid" : ""}`}
                          value={formData.birthDate}
                          onChange={(event) =>
                            handleInputChange("birthDate", event.target.value)
                          }
                        />
                        {fieldErrors.birthDate && (
                          <div className="invalid-feedback d-block">
                            <small>Este campo es obligatorio</small>
                          </div>
                        )}
                      </div>

                      <div className="col-12 col-lg-6">
                        <label className="form-label fw-semibold">
                          Teléfono <span className="text-danger">*</span>
                        </label>
                        <input
                          type="tel"
                          className={`form-control ${fieldErrors.phone ? "is-invalid" : ""}`}
                          value={formData.phone}
                          onChange={(event) =>
                            handleInputChange("phone", event.target.value)
                          }
                          placeholder="Ej: 011 1234-5678"
                        />
                        {fieldErrors.phone && (
                          <div className="invalid-feedback d-block">
                            <small>Este campo es obligatorio</small>
                          </div>
                        )}
                      </div>

                      <div className="col-12 col-lg-6">
                        <label className="form-label fw-semibold">
                          Fecha de alta <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          className={`form-control ${fieldErrors.enrollmentDate ? "is-invalid" : ""}`}
                          value={formData.enrollmentDate}
                          onChange={(event) =>
                            handleInputChange("enrollmentDate", event.target.value)
                          }
                        />
                        {fieldErrors.enrollmentDate && (
                          <div className="invalid-feedback d-block">
                            <small>Este campo es obligatorio</small>
                          </div>
                        )}
                      </div>

                      <div className="col-12 col-lg-6">
                        <label className="form-label fw-semibold">
                          Salario <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          className={`form-control ${fieldErrors.salary ? "is-invalid" : ""}`}
                          value={formData.salary}
                          onChange={(event) =>
                            handleInputChange("salary", event.target.value)
                          }
                          placeholder="Ej: 50000"
                          step="0.01"
                        />
                        {fieldErrors.salary && (
                          <div className="invalid-feedback d-block">
                            <small>Este campo es obligatorio</small>
                          </div>
                        )}
                      </div>

                      <div className="col-12">
                        <label className="form-label fw-semibold">
                          Dirección <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-control ${fieldErrors.address ? "is-invalid" : ""}`}
                          value={formData.address}
                          onChange={(event) =>
                            handleInputChange("address", event.target.value)
                          }
                          placeholder="Calle, número y localidad"
                        />
                        {fieldErrors.address && (
                          <div className="invalid-feedback d-block">
                            <small>Este campo es obligatorio</small>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>

                <div className="d-flex gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSave}
                    disabled={isSaving || isLoadingTypes}
                  >
                    {isSaving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Guardando...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-check-lg me-2"></i>
                        Guardar
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => handleClear()}
                    disabled={isSaving}
                  >
                    <i className="bi bi-arrow-clockwise me-2"></i>
                    Limpiar
                  </button>
                  {saveSuccess && (
                    <span className="text-success align-self-center" role="status">
                      <i className="bi bi-check-circle me-2"></i>
                      {saveSuccess}
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocioNuevo;
