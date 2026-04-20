import { formatCurrency } from "../utils";

export function ItemsTable({ items, type }) {
  function categoryFormat(category) {
    const traducoes = {
      service: "Serviço",
      material: "Material",
    };
    return traducoes[category] || traducoes.material;
  }

  return (
    <div className="break-inside-auto mb-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b">
        {items && items.length > 1 ? "Itens" : "Item"}
        {type === "service" ? " da Ordem de Serviço" : " do Orçamento"}
      </h3>
      <div className="border rounded-md">
        <table className="w-full border-collapse text-sm rounded-md break-inside-auto">
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
                  className="item-row border-b last:border-none  border-gray-300"
                >
                  <td className="p-1.5 font-medium text-center">{index + 1}</td>
                  <td className="p-1.5 w-1/2" width="50%">
                    {item.description || "Descrição do Item"}
                  </td>
                  <td className="p-1.5 text-center">
                    <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                      {categoryFormat(item.category)}
                    </span>
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
