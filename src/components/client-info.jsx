import { formatDocument, formatPhone, formatZipCode } from "../utils";

import { FileText, Mail, Phone } from "lucide-react";

export function ClientInfo({ customer }) {
  if (!customer) {
    throw new Error("Cliente não encontrado");
  }

  return (
    <div className="text-sm bg-gray-100 p-3 rounded-md">
      <h3 className="text-lg font-semibold text-gray-900 ">Dados do Cliente</h3>
      <div className="mt-1">
        <div className="border-b pb-3 mb-3">
          <p className="font-bold mb-1">{customer.name}</p>
          <span className="text-xs text-gray-50 px-2 py-1 bg-blue-400 rounded">
            {customer.type === "company" ? "Pessoa Jurídica" : "Pessoa Física"}
          </span>
        </div>
        <div className="text-xs space-y-1">
          <InfoRow value={customer.email} icon={Mail} />
          <InfoRow value={formatPhone(customer.phone)} icon={Phone} />
          <InfoRow value={formatDocument(customer.document)} icon={FileText} />
        </div>
        {customer.address && (
          <p className="border-t pt-3 mt-3 text-xs leading-relaxed uppercase">
            {customer.address.street}, {customer.address.number || "S/N"}
            {customer.address.complement && `, ${customer.address.complement}`}
            <br />
            {customer.address.neighborhood} - {customer.address.city}/
            {customer.address.state} -{" "}
            {formatZipCode(customer.address.zipcode) || "Não informado"}
          </p>
        )}
      </div>
    </div>
  );
}

function InfoRow({ value, icon: Icon }) {
  return (
    <div className="flex items-center gap-2">
      {Icon && <Icon className="h-4 w-4" />}
      <span>{value}</span>
    </div>
  );
}
