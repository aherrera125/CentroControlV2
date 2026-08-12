import { useEffect, useMemo, useState } from "react";

type Member = {
  id: number;
  benefitNum: string;
  fullName: string;
  dni: string;
  status: number;
};

type Payment = {
  id: number;
  memberId: number;
  amount: number;
  payDate: string;
};

type ReportRow = {
  member: Member;
  count: number;
  total: number;
  lastDate: Date | null;
};

const pageSizeOptions = [10, 20, 50, 100];

const monthsBackOptions = [1, 2, 3, 4, 5, 6];

const parseDate = (value: string): Date | null => {
  const [year, month, day] = String(value).slice(0, 10).split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
};

const getCutoffDate = (monthsBack: number): Date => {
  const cutoff = new Date();
  cutoff.setHours(0, 0, 0, 0);
  cutoff.setMonth(cutoff.getMonth() - monthsBack);
  return cutoff;
};

const formatDateObj = (date: Date) =>
  `${String(date.getDate()).padStart(2, "0")}/${String(date.getMonth() + 1).padStart(2, "0")}/${date.getFullYear()}`;

const getArray = (payload: unknown): Record<string, unknown>[] =>
  Array.isArray(payload)
    ? payload
    : Array.isArray((payload as { data?: unknown }).data)
      ? (payload as { data: Record<string, unknown>[] }).data
      : [];

const formatAmount = (amount: number) =>
  `$${amount.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;

const periodLabel = (monthsBack: number) =>
  monthsBack === 1 ? "1 mes atrás" : `${monthsBack} meses atrás`;

const ReportePagos = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [monthsBack, setMonthsBack] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const loadData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [membersResponse, paymentsResponse] = await Promise.all([
        fetch("/api/members"),
        fetch("/api/pay"),
      ]);

      if (!membersResponse.ok) throw new Error("No se pudieron cargar los socios.");
      if (!paymentsResponse.ok) throw new Error("No se pudieron cargar los pagos.");

      const membersPayload: unknown = await membersResponse.json();
      const paymentsPayload: unknown = await paymentsResponse.json();
      const membersData = getArray(membersPayload);
      const paymentsData = getArray(paymentsPayload);

      setMembers(
        membersData
          .map((m) => ({
            id: Number(m.id ?? 0),
            benefitNum: String(m.benefitNum ?? "-"),
            fullName: String(m.fullName ?? ""),
            dni: String(m.dni ?? "-"),
            status: Number(m.status ?? 0),
          }))
          .filter((m: Member) => m.status === 1),
      );

      setPayments(
        paymentsData.map((p) => ({
          id: Number(p.id ?? p.payId ?? 0),
          memberId: Number(p.memberId ?? 0),
          amount: Number(p.amount ?? 0),
          payDate: String(p.payDate ?? ""),
        })),
      );
    } catch (err) {
      console.error("Error al cargar el reporte de pagos:", err);
      setError("No fue posible cargar el reporte de pagos.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const reportRows = useMemo<ReportRow[]>(() => {
    const cutoff = getCutoffDate(monthsBack);
    const stats = new Map<number, { count: number; total: number; lastDate: Date | null }>();

    for (const payment of payments) {
      const date = parseDate(payment.payDate);
      if (!date || date.getTime() < cutoff.getTime()) continue;

      const stat = stats.get(payment.memberId) ?? { count: 0, total: 0, lastDate: null };
      stat.count += 1;
      stat.total += payment.amount;
      if (!stat.lastDate || date.getTime() > stat.lastDate.getTime()) stat.lastDate = date;
      stats.set(payment.memberId, stat);
    }

    return members
      .filter((member) => stats.has(member.id))
      .map((member) => ({ member, ...stats.get(member.id)! }));
  }, [members, payments, monthsBack]);

  const totalAmount = useMemo(
    () => reportRows.reduce((sum, row) => sum + row.total, 0),
    [reportRows],
  );

  const pageCount = Math.max(1, Math.ceil(reportRows.length / pageSize));

  useEffect(() => {
    setPage(1);
  }, [monthsBack, pageSize]);

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return reportRows.slice(start, start + pageSize);
  }, [reportRows, page, pageSize]);

  const exportToPdf = () => {
    const cutoff = getCutoffDate(monthsBack);
    const today = new Date();

    const rows = reportRows
      .map(
        (row) => `
        <tr>
          <td>${row.member.benefitNum}</td>
          <td>${row.member.fullName}</td>
          <td>${row.member.dni}</td>
          <td>${row.count}</td>
          <td>${formatAmount(row.total)}</td>
          <td>${row.lastDate ? formatDateObj(row.lastDate) : "-"}</td>
        </tr>`,
      )
      .join("");

    const win = window.open("", "_blank", "width=900,height=650");
    if (!win) return;

    win.document.write(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8" />
        <title>Reporte de Pagos</title>
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
        <h2>Reporte de Pagos</h2>
        <p class="subtitle">Período: ${periodLabel(monthsBack)} (desde ${formatDateObj(cutoff)} hasta ${formatDateObj(today)}) · Total: ${reportRows.length} socios · Total abonado: ${formatAmount(totalAmount)}</p>
        <table>
          <thead>
            <tr>
              <th>N° Beneficio</th>
              <th>Nombre y Apellido</th>
              <th>DNI</th>
              <th>Pagos</th>
              <th>Total abonado</th>
              <th>Último pago</th>
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
            <div className="col-12 col-md-4">
              <label className="form-label small fw-bold">Período</label>
              <select
                className="form-select"
                value={monthsBack}
                onChange={(e) => setMonthsBack(Number(e.target.value))}
              >
                {monthsBackOptions.map((months) => (
                  <option key={months} value={months}>{periodLabel(months)}</option>
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
            <div className="col-6 col-md-5 d-flex align-items-end justify-content-end gap-2">
              <button
                className="btn btn-outline-primary btn-sm d-flex align-items-center"
                style={{ height: "38px" }}
                onClick={() => void loadData()}
                disabled={isLoading}
              >
                <i className="bi bi-arrow-clockwise me-2"></i>Actualizar
              </button>
              <button
                className="btn btn-outline-primary btn-sm d-flex align-items-center"
                style={{ height: "38px" }}
                onClick={exportToPdf}
                disabled={isLoading || reportRows.length === 0}
              >
                <i className="bi bi-file-earmark-pdf me-2"></i>Exportar
              </button>
              <span
                className="badge bg-primary-subtle text-primary border border-primary-subtle d-flex align-items-center px-3"
                style={{ height: "38px", fontSize: "0.9rem" }}
              >
                {reportRows.length} socios
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
          ) : reportRows.length === 0 ? (
            <div className="text-center py-5 bg-light rounded-3">
              <i className="bi bi-wallet2 text-muted display-4 d-block mb-3"></i>
              <p className="text-muted">
                No se encontraron socios con pagos en el período seleccionado.
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle border-top">
                <thead className="table-light">
                  <tr>
                    <th>N° Beneficio</th>
                    <th>Nombre y Apellido</th>
                    <th>DNI</th>
                    <th>Pagos</th>
                    <th>Total abonado</th>
                    <th>Último pago</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRows.map((row) => (
                    <tr key={row.member.id}>
                      <td className="fw-bold text-primary">{row.member.benefitNum}</td>
                      <td>{row.member.fullName}</td>
                      <td>{row.member.dni}</td>
                      <td>
                        <span className="badge bg-info-subtle text-info border border-info-subtle">
                          {row.count}
                        </span>
                      </td>
                      <td className="fw-semibold">{formatAmount(row.total)}</td>
                      <td>{row.lastDate ? formatDateObj(row.lastDate) : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!isLoading && !error && reportRows.length > 0 && (
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

export default ReportePagos;
