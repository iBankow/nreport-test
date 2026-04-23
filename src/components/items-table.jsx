import { formatCurrency } from "../utils";

export function ItemsTable({ items, type }) {
  return (
    <div className="break-inside-auto">
      <h3 className="font-semibold text-gray-900">
        {items && items.length > 1 ? "Itens" : "Item"}
        {type === "service" ? " da Ordem de Serviço" : " do Orçamento"}
      </h3>
      <div className="border rounded-md text-xs">
        <table className="w-full border-collapse rounded-md break-inside-auto">
          <thead className="item-row border-b ">
            <tr className="bg-gray-100">
              <th className="p-2 text-center">Item</th>
              <th className="p-2 text-left">Descrição</th>
              <th className="p-2 text-center">Categoria</th>
              <th className="p-2 text-center">Qtd</th>
              <th className="p-2 text-right">Valor Unit.</th>
              <th className="p-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="item-row border-b last:border-none odd:bg-white even:bg-gray-100"
                >
                  <td className="p-1.5 font-medium text-center">{index + 1}</td>
                  <td className="p-1.5 w-1/2" width="50%">
                    {item.description || "Descrição do Item"}
                  </td>
                  <td className="p-1.5 text-center">
                    <CategoryBadge category={item.category} />
                  </td>
                  <td className="p-1.5 text-center">{item.quantity}</td>
                  <td className="p-1.5 text-right">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="p-1.5 text-right font-medium">
                    {formatCurrency(item.total)}
                  </td>
                </tr>
              ))
            ) : (
              <tr key="empty">
                <td
                  colSpan="6"
                  className="border border-gray-300 px-4 py-8 text-center text-gray-500"
                >
                  Nenhum item foi adicionado{" "}
                  {type === "service" ? "à ordem de serviço" : "ao orçamento"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function CategoryBadge({ category }) {
  const traducoes = {
    service: "Serviço",
    material: "Material",
  };
  const label = traducoes[category] || traducoes.material;

  const colors = {
    service: "bg-blue-100 text-blue-800",
    material: "bg-orange-100 text-orange-800",
  };
  const colorClasses = colors[category] || colors.material;

  return (
    <span className={`px-2 py-1 rounded text-xs ${colorClasses}`}>
      {label}
    </span>
  );
}
