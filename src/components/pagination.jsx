import { formatDateTime } from "../utils";

export function Pagination({ name, sid, type }) {
  const currentDate = formatDateTime(new Date().toISOString());
  const count = sid || "00001/2026";
  const headerContent =
    type === "order" ? `Ordem de Serviço #${count}` : `Orçamento #${count}`;

  const date = new Date();
  const validity = new Date(
    date.setDate(date.getDate() + 15),
  ).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <>
      <p className="header header-left">{headerContent}</p>
      <p className="header header-right">Data de emissão: {currentDate}</p>
      <p className="footer footer-left truncate max-w-72">{name}</p>
      <p className="footer footer-center">
        <span>
          Página <span className="pageNumber" /> de{" "}
          <span className="totalPages" />
        </span>
      </p>
      <p className="footer footer-right">Válido até: {validity}</p>
    </>
  );
}
