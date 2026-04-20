import { formatCurrency } from "../utils";

export function Resume({
  items,
  discount,
  discount_type,
  discount_value,
  subtotal,
  total,
}) {
  const traduzirCategoria = (category) => {
    const traducoes = {
      service: "Serviço",
      material: "Material",
      equipment: "Equipamento",
      labor: "Mão de obra",
    };
    return traducoes[category] || category;
  };

  const categorias = ["service", "material", "equipment", "labor"];

  const calcularTotalPorCategoria = (categoria) => {
    if (!items || items.length === 0) return 0;
    return items
      .filter((item) => item.category === categoria)
      .reduce((total, item) => total + (item.total || 0), 0);
  };

  const totalPorCategoria = categorias
    .map((categoria) => {
      return {
        categoria,
        total: calcularTotalPorCategoria(categoria),
      };
    })
    .filter((cat) => cat.total > 0);

  return (
    <div className={"grid grid-cols-2 gap-4 mb-4 gap-y-0"}>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 border-b col-start-1">
        Resumo por Categoria
      </h3>
      <h3 className="text-lg font-semibold text-gray-900 mb-2 border-b col-start-2">
        Total Geral
      </h3>
      <div className="border border-gray-300 rounded-md overflow-hidden col-start-1">
        <table className="w-full border-collapse text-xs">
          <thead>
            <tr className="bg-gray-100 w-full">
              <th className="p-2 text-center border-b border-gray-300">Item</th>
              <th className="p-2 text-left border-b border-gray-300">
                Categoria
              </th>
              <th className="p-2 text-right border-b border-gray-300">Total</th>
            </tr>
          </thead>
          <tbody>
            {totalPorCategoria.map((categoria, index) => {
              return (
                <tr
                  key={categoria.categoria}
                  className="border-b border-gray-300 last:border-0"
                >
                  <td
                    className="p-2 font-medium text-gray-700 w-[10%] text-center"
                    width={10}
                  >
                    {index + 1}
                  </td>
                  <td className="p-2 font-medium text-gray-700">
                    {traduzirCategoria(categoria.categoria)}
                  </td>
                  <td className="p-2 text-right font-bold text-gray-900">
                    {formatCurrency(categoria.total)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="bg-blue-50 p-4 rounded-md col-start-2 w-full">
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Subtotal:</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>

        {discount_value > 0 && (
          <DiscountType
            discount_type={discount_type}
            discount_value={discount_value}
            discount={discount}
          />
        )}

        <div className="flex justify-between py-2 border-t-2 border-blue-900 text-lg font-bold text-blue-900">
          <span>Total Geral:</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}

function DiscountType({ discount_type, discount_value, discount }) {
  if (discount_type === "percentage") {
    return (
      <>
        <div className="flex justify-between text-sm text-red-600">
          <span>Desconto (Percentual):</span>
          <span className="font-medium">-{discount_value}%</span>
        </div>
        <div className="flex justify-between text-sm text-red-600">
          <span>Desconto:</span>
          <span className="font-medium">-{formatCurrency(discount)}</span>
        </div>
      </>
    );
  }

  return (
    <div className="flex justify-between text-sm text-red-600">
      <span>Desconto (Valor Fixo):</span>
      <span className="font-medium">-{formatCurrency(discount)}</span>
    </div>
  );
}
