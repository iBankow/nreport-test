export function Footer({ name }) {
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
      <p className="footer footer-left">{name}</p>
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
