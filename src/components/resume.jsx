import { formatCurrency } from "../utils";

export function Resume({
  discount,
  discount_type,
  discount_value,
  subtotal,
  total,
}) {
  return (
    <div className="text-sm w-full">
      <h3 className="font-semibold text-gray-900">Total Geral</h3>
      <div className="bg-blue-50 p-3 rounded-md col-start-2 w-full text-xs">
        <div className="flex justify-between">
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

        <div className="flex mt-1 py-1 justify-between border-t-2 border-blue-900 text-lg font-bold text-blue-900">
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
      <div className="flex justify-between text-red-600">
        <span>Desconto ({discount_value}%):</span>
        <span className="font-medium">-{formatCurrency(discount)}</span>
      </div>
    );
  }

  return (
    <div className="flex justify-between text-red-600">
      <span>Desconto (Valor Fixo):</span>
      <span className="font-medium">-{formatCurrency(discount)}</span>
    </div>
  );
}
