import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";

type Member = {
  id: number;
  benefitNum: string;
  fullName: string;
  status: number;
};

type Payment = {
  id: number;
  memberId: number;
  amount: number;
  payDate: string;
  dueDate: string;
  status: string;
  monthPaid: string;
  voucherNumber: string;
  note: string;
};

type PaymentDetailForm = {
  amount: string;
  payDate: string;
  monthPaid: string;
  voucherNumber: string;
  note: string;
};

type PaymentForm = {
  amount: string;
  monthPaid: string;
  voucherNumber: string;
  note: string;
};

const emptyPaymentForm: PaymentForm = {
  amount: "",
  monthPaid: "",
  voucherNumber: "",
  note: "",
};

const emptyPaymentDetailForm: PaymentDetailForm = {
  amount: "",
  payDate: "",
  monthPaid: "",
  voucherNumber: "",
  note: "",
};

const pageSizeOptions = [10, 20, 50, 100];

const getToday = () => new Date().toISOString().slice(0, 10);

const toPayment = (payment: Record<string, unknown>): Payment => ({
  id: Number(payment.id ?? payment.payId ?? 0),
  memberId: Number(payment.memberId ?? 0),
  amount: Number(payment.amount ?? 0),
  payDate: String(payment.payDate ?? "").slice(0, 10),
  dueDate: String(payment.dueDate ?? payment.payDate ?? "").slice(0, 10),
  status: String(payment.status ?? "paid"),
  monthPaid: String(payment.monthPaid ?? ""),
  voucherNumber: String(payment.voucherNumber ?? payment.voucherNum ?? ""),
  note: String(payment.note ?? ""),
});

const formatDate = (date: string) => {
  const [year, month, day] = String(date).slice(0, 10).split("-");
  return year && month && day ? `${day}/${month}/${year}` : "-";
};

const Pagos = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [memberForPayment, setMemberForPayment] = useState<Member | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [paymentPage, setPaymentPage] = useState(1);
  const [paymentPageSize, setPaymentPageSize] = useState(10);
  const [paymentForm, setPaymentForm] = useState<PaymentForm>(emptyPaymentForm);
  const [fieldErrors, setFieldErrors] = useState<Record<keyof PaymentForm, boolean>>({
    amount: false,
    monthPaid: false,
    voucherNumber: false,
    note: false,
  });
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [isLoadingPayments, setIsLoadingPayments] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [membersError, setMembersError] = useState<string | null>(null);
  const [paymentsError, setPaymentsError] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);
  const [pendingDeletePayment, setPendingDeletePayment] = useState<Payment | null>(null);
  const [isDeletingPayment, setIsDeletingPayment] = useState(false);
  const [paymentDeleteError, setPaymentDeleteError] = useState<string | null>(null);
  const [selectedPaymentDetail, setSelectedPaymentDetail] = useState<Payment | null>(null);
  const [paymentDetailForm, setPaymentDetailForm] = useState<PaymentDetailForm>(emptyPaymentDetailForm);
  const [detailFieldErrors, setDetailFieldErrors] = useState<Record<keyof PaymentDetailForm, boolean>>({
    amount: false,
    payDate: false,
    monthPaid: false,
    voucherNumber: false,
    note: false,
  });
  const [isSavingDetail, setIsSavingDetail] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [detailSaveError, setDetailSaveError] = useState<string | null>(null);
  const [detailSaveSuccess, setDetailSaveSuccess] = useState<string | null>(null);

  const loadMembers = async () => {
    setIsLoadingMembers(true);
    setMembersError(null);

    try {
      const response = await fetch("/api/members");
      if (!response.ok) throw new Error("No se pudieron cargar los socios.");

      const payload: unknown = await response.json();
      const data = Array.isArray(payload)
        ? payload
        : Array.isArray((payload as { data?: unknown }).data)
          ? (payload as { data: Record<string, unknown>[] }).data
          : [];

      setMembers(
        data
          .map((member: Record<string, unknown>) => ({
            id: Number(member.id ?? 0),
            benefitNum: String(member.benefitNum ?? ""),
            fullName: String(member.fullName ?? ""),
            status: Number(member.status ?? 0),
          }))
          .filter((member) => member.status === 1),
      );
    } catch (error) {
      console.error("Error al cargar socios:", error);
      setMembers([]);
      setMembersError("No fue posible cargar los socios activos.");
    } finally {
      setIsLoadingMembers(false);
    }
  };

  const loadPayments = async () => {
    setIsLoadingPayments(true);
    setPaymentsError(null);

    try {
      const response = await fetch("/api/pay");
      if (!response.ok) throw new Error("No se pudieron cargar los pagos.");

      const payload: unknown = await response.json();
      const data = Array.isArray(payload)
        ? payload
        : Array.isArray((payload as { data?: unknown }).data)
          ? (payload as { data: Record<string, unknown>[] }).data
          : [];

      setPayments(
        data.map((payment: Record<string, unknown>) => toPayment(payment)),
      );
    } catch (error) {
      console.error("Error al cargar pagos:", error);
      setPayments([]);
      setPaymentsError("No fue posible cargar el historial de pagos.");
    } finally {
      setIsLoadingPayments(false);
    }
  };

  useEffect(() => {
    void loadMembers();
    void loadPayments();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, pageSize]);

  useEffect(() => {
    setPaymentPage(1);
  }, [selectedMember, paymentPageSize]);

  const filteredMembers = members.filter((member) => {
    const term = searchTerm.trim().toLowerCase();
    return !term || member.fullName.toLowerCase().includes(term) || member.benefitNum.toLowerCase().includes(term);
  });

  const pageCount = Math.max(1, Math.ceil(filteredMembers.length / pageSize));

  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

   const getPaginationItems = (currentPage: number, totalPages: number): (number | "ellipsis")[] => {
    if (totalPages <= 10) return Array.from({ length: totalPages }, (_, index) => index + 1);

    const firstPages = [1, 2, 3, 4];
    const lastPages = [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];

    if (currentPage <= 4 || currentPage >= totalPages - 3) return [...firstPages, "ellipsis", ...lastPages];

    const windowStart = Math.max(5, currentPage - 1);
    const windowEnd = Math.min(totalPages - 4, currentPage + 2);
    const windowPages = Array.from({ length: windowEnd - windowStart + 1 }, (_, index) => windowStart + index);
    return [...firstPages, "ellipsis", ...windowPages, "ellipsis", ...lastPages];
  };

  const paginatedMembers = filteredMembers.slice((page - 1) * pageSize, page * pageSize);
  const paginationItems = getPaginationItems(page, pageCount);

  const selectedMemberPayments = useMemo(
    () =>
      payments
        .filter((payment) => payment.memberId === selectedMember?.id)
        .sort((first, second) => new Date(second.payDate).getTime() - new Date(first.payDate).getTime()),
    [payments, selectedMember],
  );

  const paymentPageCount = Math.max(1, Math.ceil(selectedMemberPayments.length / paymentPageSize));

  useEffect(() => {
    if (paymentPage > paymentPageCount) setPaymentPage(paymentPageCount);
  }, [paymentPage, paymentPageCount]);

  const paginatedPayments = useMemo(() => {
    const start = (paymentPage - 1) * paymentPageSize;
    return selectedMemberPayments.slice(start, start + paymentPageSize);
  }, [selectedMemberPayments, paymentPage, paymentPageSize]);

  const paymentPaginationItems = getPaginationItems(paymentPage, paymentPageCount);

  const handleSelectMember = (member: Member) => {
    setSelectedMember(member);
  };

  const openPaymentModal = (member: Member) => {
    setSelectedMember(member);
    setMemberForPayment(member);
    setPaymentForm(emptyPaymentForm);
    setFieldErrors({ amount: false, monthPaid: false, voucherNumber: false, note: false });
    setSaveError(null);
    setSaveSuccess(null);
  };

  const closePaymentModal = () => {
    setMemberForPayment(null);
    setSaveError(null);
    setSaveSuccess(null);
  };

  const handleFormChange = (field: keyof PaymentForm, value: string) => {
    setPaymentForm((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: false }));
  };

  const handleClear = () => {
    setPaymentForm(emptyPaymentForm);
    setFieldErrors({ amount: false, monthPaid: false, voucherNumber: false, note: false });
    setSaveError(null);
    setSaveSuccess(null);
  };

  const handleSavePayment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!memberForPayment) return;

    const errors = {
      amount: !paymentForm.amount.trim() || Number(paymentForm.amount) <= 0,
      monthPaid: !paymentForm.monthPaid.trim(),
      voucherNumber: !paymentForm.voucherNumber.trim(),
      note: !paymentForm.note.trim(),
    };
    setFieldErrors(errors);
    setSaveError(null);
    setSaveSuccess(null);

    if (Object.values(errors).some(Boolean)) return;

    setIsSaving(true);
    const payDate = getToday();

    try {
      const response = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId: memberForPayment.id,
          amount: Number(paymentForm.amount),
          payDate,
          dueDate: payDate,
          status: "paid",
          monthPaid: paymentForm.monthPaid.trim(),
          voucherNumber: paymentForm.voucherNumber.trim(),
          note: paymentForm.note.trim(),
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.message ?? "No se pudo guardar el pago.");
      }

      setSaveSuccess("El pago se guardó correctamente.");
      setPaymentForm(emptyPaymentForm);
      await loadPayments();
    } catch (error) {
      console.error("Error al guardar pago:", error);
      setSaveError(error instanceof Error ? error.message : "No se pudo guardar el pago.");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePaymentDetailChange = (field: keyof PaymentDetailForm, value: string) => {
    setPaymentDetailForm((current) => ({ ...current, [field]: value }));
    setDetailFieldErrors((current) => ({ ...current, [field]: false }));
    setDetailSaveError(null);
    setDetailSaveSuccess(null);
  };

  const closePaymentDetail = () => {
    setSelectedPaymentDetail(null);
    setDetailSaveError(null);
    setDetailSaveSuccess(null);
  };

  const handleUpdatePayment = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedPaymentDetail) return;

    const errors = {
      amount: !paymentDetailForm.amount.trim() || Number(paymentDetailForm.amount) <= 0,
      payDate: !paymentDetailForm.payDate.trim(),
      monthPaid: !paymentDetailForm.monthPaid.trim(),
      voucherNumber: !paymentDetailForm.voucherNumber.trim(),
      note: !paymentDetailForm.note.trim(),
    };
    setDetailFieldErrors(errors);
    setDetailSaveError(null);
    setDetailSaveSuccess(null);

    if (Object.values(errors).some(Boolean)) return;

    setIsSavingDetail(true);
    try {
      const response = await fetch(`/api/pay/${selectedPaymentDetail.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId: selectedPaymentDetail.memberId,
          amount: Number(paymentDetailForm.amount),
          payDate: paymentDetailForm.payDate,
          dueDate: selectedPaymentDetail.dueDate || paymentDetailForm.payDate,
          status: selectedPaymentDetail.status || "paid",
          monthPaid: paymentDetailForm.monthPaid.trim(),
          voucherNumber: paymentDetailForm.voucherNumber.trim(),
          note: paymentDetailForm.note.trim(),
        }),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.message ?? "No se pudo actualizar el pago.");
      }

      setSelectedPaymentDetail((current) =>
        current
          ? {
              ...current,
              amount: Number(paymentDetailForm.amount),
              payDate: paymentDetailForm.payDate,
              monthPaid: paymentDetailForm.monthPaid.trim(),
              voucherNumber: paymentDetailForm.voucherNumber.trim(),
              note: paymentDetailForm.note.trim(),
            }
          : current,
      );
      setDetailSaveSuccess("El pago se actualizó correctamente.");
      await loadPayments();
    } catch (error) {
      console.error("Error al actualizar pago:", error);
      setDetailSaveError(error instanceof Error ? error.message : "No se pudo actualizar el pago.");
    } finally {
      setIsSavingDetail(false);
    }
  };

  const handleDeletePayment = async () => {
    if (!pendingDeletePayment) return;
    setPaymentDeleteError(null);
    setIsDeletingPayment(true);
    try {
      const response = await fetch(`/api/pay/${pendingDeletePayment.id}`, { method: "DELETE" });
      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(payload?.message ?? "No se pudo eliminar el pago.");
      }

      setPayments((current) => current.filter((payment) => payment.id !== pendingDeletePayment.id));
      if (selectedPaymentDetail?.id === pendingDeletePayment.id) closePaymentDetail();
      setPendingDeletePayment(null);
    } catch (error) {
      console.error("Error al eliminar pago:", error);
      setPaymentDeleteError(error instanceof Error ? error.message : "No se pudo eliminar el pago.");
    } finally {
      setIsDeletingPayment(false);
    }
  };

  const fetchPaymentDetail = async (paymentId: number) => {
    setIsLoadingDetail(true);
    setDetailError(null);
    try {
      const response = await fetch(`/api/pay/${paymentId}`);
      if (!response.ok) throw new Error("No se pudo cargar el detalle del pago.");

      const payload: unknown = await response.json();
      if (!payload || typeof payload !== "object" || !("data" in payload)) {
        throw new Error("La respuesta del servidor no contiene el detalle del pago.");
      }
      const payment = toPayment((payload as { data: Record<string, unknown> }).data);
      setSelectedPaymentDetail(payment);
      setPaymentDetailForm({
        amount: String(payment.amount),
        payDate: payment.payDate,
        monthPaid: payment.monthPaid,
        voucherNumber: payment.voucherNumber,
        note: payment.note,
      });
      setDetailFieldErrors({
        amount: false,
        payDate: false,
        monthPaid: false,
        voucherNumber: false,
        note: false,
      });
      setDetailSaveError(null);
      setDetailSaveSuccess(null);
    } catch (error) {
      console.error("Error al cargar detalle:", error);
      setDetailError(error instanceof Error ? error.message : "No se pudo cargar el detalle del pago.");
    } finally {
      setIsLoadingDetail(false);
    }
  };

  return (
    <div className="container-fluid p-0">
      <div className="row g-4">
        <div className="col-12">
          <div className="card shadow-sm border-0 members-panel">
            <div className="card-body">
              <div className="row g-4">


                <div className="col-12 col-lg-7">
                  <div className="border rounded-3 h-100 p-3 d-flex flex-column">
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
                        <h3 className="h6 mb-0">Socios activos</h3>
                        <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => void loadMembers()} disabled={isLoadingMembers}>
                          <i className="bi bi-arrow-clockwise me-2" aria-hidden="true" />Recargar
                        </button>
                      </div>

                      <div className="row g-2 align-items-end mb-3">
                        <div className="col-12 col-md-6">
                          <label className="form-label visually-hidden" htmlFor="payment-member-search">Buscar socios</label>
                          <input id="payment-member-search" type="search" className="form-control" placeholder="Buscar por nombre o beneficio" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} />
                        </div>
                        <div className="col-7 col-md-4">
                          <label className="form-label visually-hidden" htmlFor="payment-page-size">Registros por página</label>
                          <select id="payment-page-size" className="form-select" value={pageSize} onChange={(event) => setPageSize(Number(event.target.value))}>
                            {pageSizeOptions.map((size) => <option key={size} value={size}>Mostrar {size}</option>)}
                          </select>
                        </div>
                        <div className="col-5 col-md-2 text-end"><p className="mb-0 text-muted">{filteredMembers.length}</p></div>
                      </div>

                      {isLoadingMembers ? (
                        <div className="text-center py-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Cargando socios...</span></div></div>
                      ) : membersError ? (
                        <div className="alert alert-warning mb-0" role="alert">{membersError}</div>
                      ) : filteredMembers.length === 0 ? (
                        <p className="text-muted text-center py-5 mb-0">{members.length === 0 ? "No hay socios activos registrados." : `No se encontraron socios para "${searchTerm}".`}</p>
                      ) : (
                        <div className="table-responsive">
                          <table className="table table-hover align-middle mb-0">
                            <thead className="table-light"><tr><th>Número de beneficio</th><th>Nombre</th><th /></tr></thead>
                            <tbody>
                              {paginatedMembers.map((member) => (
                                <tr key={member.id} className={selectedMember?.id === member.id ? "table-primary" : ""} onClick={() => handleSelectMember(member)}>
                                  <td className="fw-semibold">{member.benefitNum || "-"}</td>
                                  <td>{member.fullName}</td>
                                  <td className="text-end">
                                    <button type="button" className="btn btn-outline-primary btn-sm" onClick={(event) => { event.stopPropagation(); openPaymentModal(member); }}>
                                      Realizar pago
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {!isLoadingMembers && !membersError && filteredMembers.length > 0 && (
                      <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3 mt-4 pt-3 border-top">
                        <div className="text-muted small">
                          Página <strong>{page}</strong> de {pageCount}
                        </div>
                        <nav aria-label="Paginación de socios activos">
                          <ul className="pagination pagination-sm mb-0">
                            <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                              <button type="button" className="page-link" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1}>Anterior</button>
                            </li>
                            {paginationItems.map((item, index) => item === "ellipsis" ? (
                              <li key={`ellipsis-${index}`} className="page-item disabled"><span className="page-link">…</span></li>
                            ) : (
                              <li key={item} className={`page-item ${item === page ? "active" : ""}`}><button type="button" className="page-link" onClick={() => setPage(item)}>{item}</button></li>
                            ))}
                            <li className={`page-item ${page === pageCount ? "disabled" : ""}`}>
                              <button type="button" className="page-link" onClick={() => setPage((current) => Math.min(pageCount, current + 1))} disabled={page === pageCount}>Siguiente</button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    )}
                  </div>
                </div>

                <div className="col-12 col-lg-5">
                  <div className="border rounded-3 h-100 p-3 d-flex flex-column">
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h3 className="h6 mb-0">Historial de pagos</h3>
                        {selectedMember && <p className="mb-0 text-muted small">{selectedMemberPayments.length} registros</p>}
                      </div>

                      {detailError && <div className="alert alert-danger py-2" role="alert">{detailError}</div>}

                      {selectedMember && (
                        <div className="row g-2 align-items-end mb-3">
                          <div className="col-12">
                            <label className="form-label visually-hidden" htmlFor="payment-history-page-size">Registros por página</label>
                            <select id="payment-history-page-size" className="form-select form-select-sm" value={paymentPageSize} onChange={(event) => setPaymentPageSize(Number(event.target.value))}>
                              {pageSizeOptions.map((size) => <option key={size} value={size}>Mostrar {size}</option>)}
                            </select>
                          </div>
                        </div>
                      )}

                      {!selectedMember ? (
                        <p className="text-muted text-center py-5 mb-0">Seleccione un socio para ver su historial de pagos.</p>
                      ) : isLoadingPayments ? (
                        <div className="text-center py-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Cargando historial...</span></div></div>
                      ) : paymentsError ? (
                        <div className="alert alert-warning mb-0" role="alert">{paymentsError}</div>
                      ) : selectedMemberPayments.length === 0 ? (
                        <p className="text-muted text-center py-5 mb-0">{selectedMember.fullName} no registra pagos.</p>
                      ) : (
                        <div className="table-responsive">
                          <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                              <tr>
                                <th>Fecha</th>                              
                                <th>Importe</th>
                                <th className="text-end">Acciones</th>

                              </tr>
                            </thead>
                            <tbody>
                              {paginatedPayments.map((payment) => (
                                <tr key={payment.id}>
                                  <td>{formatDate(payment.payDate)}</td>                                
                                  <td>${payment.amount.toLocaleString("es-AR", { minimumFractionDigits: 2 })}</td>
                                  <td>
                                    <div className="d-flex justify-content-end align-items-center gap-2">
                                      <button
                                        type="button"
                                        className="btn btn-link btn-sm p-0 text-decoration-none"
                                        onClick={() => void fetchPaymentDetail(payment.id)}
                                        disabled={isLoadingDetail}
                                      >
                                        Detalle
                                      </button>
                                      <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm"
                                        aria-label="Eliminar pago"
                                        title="Eliminar pago"
                                        onClick={() => {
                                          setPaymentDeleteError(null);
                                          setPendingDeletePayment(payment);
                                        }}
                                      >
                                        <i className="bi bi-trash" aria-hidden="true" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>

                    {selectedMember && !isLoadingPayments && !paymentsError && selectedMemberPayments.length > 0 && (
                      <div className="d-flex flex-column align-items-center gap-2 mt-4 pt-3 border-top">
                        <div className="text-muted small">
                          Página <strong>{paymentPage}</strong> de {paymentPageCount}
                        </div>
                        <nav aria-label="Paginación de historial de pagos">
                          <ul className="pagination pagination-sm mb-0">
                            <li className={`page-item ${paymentPage === 1 ? "disabled" : ""}`}>
                              <button type="button" className="page-link" onClick={() => setPaymentPage((current) => Math.max(1, current - 1))} disabled={paymentPage === 1}>Ant.</button>
                            </li>
                            {paymentPaginationItems.map((item, index) => item === "ellipsis" ? (
                              <li key={`pay-ellipsis-${index}`} className="page-item disabled"><span className="page-link">…</span></li>
                            ) : (
                              <li key={`pay-page-${item}`} className={`page-item ${item === paymentPage ? "active" : ""}`}><button type="button" className="page-link" onClick={() => setPaymentPage(item)}>{item}</button></li>
                            ))}
                            <li className={`page-item ${paymentPage === paymentPageCount ? "disabled" : ""}`}>
                              <button type="button" className="page-link" onClick={() => setPaymentPage((current) => Math.min(paymentPageCount, current + 1))} disabled={paymentPage === paymentPageCount}>Sig.</button>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {memberForPayment && (
        <>
          <div className="modal-backdrop fade show" />
          <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Realizar pago</h5>
                  <button type="button" className="btn-close" aria-label="Cerrar" onClick={closePaymentModal} />
                </div>
                <form noValidate onSubmit={handleSavePayment}>
                  <div className="modal-body">
                    <div className="row gy-3">
                      <div className="col-12 col-md-6"><label className="form-label">Nombre</label><input className="form-control" value={memberForPayment.fullName} readOnly /></div>
                      <div className="col-12 col-md-6"><label className="form-label">Número de beneficio</label><input className="form-control" value={memberForPayment.benefitNum} readOnly /></div>
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold" htmlFor="payment-amount">Importe <span className="text-danger">*</span></label>
                        <input id="payment-amount" type="number" min="0.01" step="0.01" className={`form-control ${fieldErrors.amount ? "is-invalid" : ""}`} value={paymentForm.amount} onChange={(event) => handleFormChange("amount", event.target.value)} />
                        {fieldErrors.amount && <div className="invalid-feedback d-block"><small>Ingrese un importe válido</small></div>}
                      </div>
                      <div className="col-12 col-md-6"><label className="form-label">Fecha de pago</label><input className="form-control" value={formatDate(getToday())} readOnly /></div>
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold" htmlFor="payment-month">Mes a pagar <span className="text-danger">*</span></label>
                        <input id="payment-month" type="text" className={`form-control ${fieldErrors.monthPaid ? "is-invalid" : ""}`} value={paymentForm.monthPaid} onChange={(event) => handleFormChange("monthPaid", event.target.value)} placeholder="Ej: Julio 2026" />
                        {fieldErrors.monthPaid && <div className="invalid-feedback d-block"><small>Este campo es obligatorio</small></div>}
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold" htmlFor="payment-voucher">Número de comprobante <span className="text-danger">*</span></label>
                        <input id="payment-voucher" type="text" className={`form-control ${fieldErrors.voucherNumber ? "is-invalid" : ""}`} value={paymentForm.voucherNumber} onChange={(event) => handleFormChange("voucherNumber", event.target.value)} />
                        {fieldErrors.voucherNumber && <div className="invalid-feedback d-block"><small>Este campo es obligatorio</small></div>}
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold" htmlFor="payment-note">Nota <span className="text-danger">*</span></label>
                        <textarea id="payment-note" className={`form-control ${fieldErrors.note ? "is-invalid" : ""}`} rows={3} value={paymentForm.note} onChange={(event) => handleFormChange("note", event.target.value)} />
                        {fieldErrors.note && <div className="invalid-feedback d-block"><small>Este campo es obligatorio</small></div>}
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    {(saveError || saveSuccess) && (
                      <div className={`me-auto small ${saveError ? "text-danger" : "text-success"}`} role={saveError ? "alert" : "status"}>
                        <i className={`bi ${saveError ? "bi-exclamation-circle" : "bi-check-circle"} me-2`} aria-hidden="true" />
                        {saveError || saveSuccess}
                      </div>
                    )}
                    <button type="button" className="btn btn-outline-secondary" onClick={handleClear} disabled={isSaving}><i className="bi bi-arrow-clockwise me-2" />Limpiar</button>
                    <button type="submit" className="btn btn-primary" disabled={isSaving}>{isSaving ? <><span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />Guardando...</> : <><i className="bi bi-check-lg me-2" />Guardar</>}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {selectedPaymentDetail && (
        <>
          <div className="modal-backdrop fade show" />
          <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
              <div className="modal-content border-0 shadow">
                <div className="modal-header">
                  <div>
                    <h5 className="modal-title">Detalle del pago</h5>
                    <p className="small text-muted mb-0">ID: {selectedPaymentDetail.id}</p>
                  </div>
                  <button type="button" className="btn-close" aria-label="Cerrar" onClick={closePaymentDetail} disabled={isSavingDetail} />
                </div>
                <form noValidate onSubmit={handleUpdatePayment}>
                  <div className="modal-body">
                    <div className="row gy-3">
                      <div className="col-12 col-md-6">
                        <label className="form-label" htmlFor="payment-detail-member">Socio</label>
                        <input id="payment-detail-member" className="form-control" value={selectedMember?.fullName || "N/A"} readOnly />
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold" htmlFor="payment-detail-date">Fecha de pago <span className="text-danger">*</span></label>
                        <input
                          id="payment-detail-date"
                          type="date"
                          className={`form-control ${detailFieldErrors.payDate ? "is-invalid" : ""}`}
                          value={paymentDetailForm.payDate}
                          onChange={(event) => handlePaymentDetailChange("payDate", event.target.value)}
                          disabled={isSavingDetail}
                        />
                        {detailFieldErrors.payDate && <div className="invalid-feedback d-block"><small>Ingrese una fecha válida</small></div>}
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold" htmlFor="payment-detail-amount">Importe <span className="text-danger">*</span></label>
                        <input
                          id="payment-detail-amount"
                          type="number"
                          min="0.01"
                          step="0.01"
                          className={`form-control ${detailFieldErrors.amount ? "is-invalid" : ""}`}
                          value={paymentDetailForm.amount}
                          onChange={(event) => handlePaymentDetailChange("amount", event.target.value)}
                          disabled={isSavingDetail}
                        />
                        {detailFieldErrors.amount && <div className="invalid-feedback d-block"><small>Ingrese un importe válido</small></div>}
                      </div>
                      <div className="col-12 col-md-6">
                        <label className="form-label fw-semibold" htmlFor="payment-detail-month">Mes abonado <span className="text-danger">*</span></label>
                        <input
                          id="payment-detail-month"
                          type="text"
                          className={`form-control ${detailFieldErrors.monthPaid ? "is-invalid" : ""}`}
                          value={paymentDetailForm.monthPaid}
                          onChange={(event) => handlePaymentDetailChange("monthPaid", event.target.value)}
                          disabled={isSavingDetail}
                        />
                        {detailFieldErrors.monthPaid && <div className="invalid-feedback d-block"><small>Este campo es obligatorio</small></div>}
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold" htmlFor="payment-detail-voucher">N° de comprobante <span className="text-danger">*</span></label>
                        <input
                          id="payment-detail-voucher"
                          type="text"
                          className={`form-control ${detailFieldErrors.voucherNumber ? "is-invalid" : ""}`}
                          value={paymentDetailForm.voucherNumber}
                          onChange={(event) => handlePaymentDetailChange("voucherNumber", event.target.value)}
                          disabled={isSavingDetail}
                        />
                        {detailFieldErrors.voucherNumber && <div className="invalid-feedback d-block"><small>Este campo es obligatorio</small></div>}
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold" htmlFor="payment-detail-note">Nota <span className="text-danger">*</span></label>
                        <textarea
                          id="payment-detail-note"
                          className={`form-control ${detailFieldErrors.note ? "is-invalid" : ""}`}
                          rows={3}
                          value={paymentDetailForm.note}
                          onChange={(event) => handlePaymentDetailChange("note", event.target.value)}
                          disabled={isSavingDetail}
                        />
                        {detailFieldErrors.note && <div className="invalid-feedback d-block"><small>Este campo es obligatorio</small></div>}
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    {(detailSaveError || detailSaveSuccess) && (
                      <div className={`me-auto small ${detailSaveError ? "text-danger" : "text-success"}`} role={detailSaveError ? "alert" : "status"}>
                        <i className={`bi ${detailSaveError ? "bi-exclamation-circle" : "bi-check-circle"} me-2`} aria-hidden="true" />
                        {detailSaveError || detailSaveSuccess}
                      </div>
                    )}
                    <button type="button" className="btn btn-outline-secondary" onClick={closePaymentDetail} disabled={isSavingDetail}>Cerrar</button>
                    <button type="submit" className="btn btn-primary" disabled={isSavingDetail}>
                      {isSavingDetail ? <><span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />Guardando...</> : <><i className="bi bi-check-lg me-2" />Guardar cambios</>}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {pendingDeletePayment && (
        <>
          <div className="modal-backdrop fade show" />
          <div className="modal fade show d-block" tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="delete-payment-title">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content border-0 shadow">
                <div className="modal-header">
                  <h5 className="modal-title" id="delete-payment-title">Confirmar eliminación</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Cerrar"
                    onClick={() => setPendingDeletePayment(null)}
                    disabled={isDeletingPayment}
                  />
                </div>
                <div className="modal-body">
                  <p className="mb-0">¿Desea eliminar este pago?</p>
                  {paymentDeleteError && <div className="alert alert-danger mt-3 mb-0" role="alert">{paymentDeleteError}</div>}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setPendingDeletePayment(null)}
                    disabled={isDeletingPayment}
                  >
                    NO
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => void handleDeletePayment()}
                    disabled={isDeletingPayment}
                  >
                    {isDeletingPayment ? <><span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />Eliminando...</> : "SI"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Pagos;
