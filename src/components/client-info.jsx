import { formatDocument, formatPhone, formatZipCode } from "../utils";

import { FileText, Mail, Phone } from "lucide-react";
import { Separator } from "./ui/separator";

export function ClientInfo({ customer }) {
  if (!customer) {
    throw new Error("Cliente não encontrado");
  }

  return (
    <div className="text-sm w-full">
      <h3 className="font-semibold text-gray-900">Dados do Cliente</h3>
      <div className="bg-gray-100 p-3 rounded-md space-y-1">
        <p className="font-bold mb-1">{customer.name}</p>
        <Separator />
        <div className="grid grid-cols-2">
          <div className="text-xs space-y-1">
            <InfoRow value={customer.email} icon={Mail} />
            <InfoRow value={formatPhone(customer.phone)} icon={Phone} />
            <InfoRow
              value={formatDocument(customer.document)}
              icon={FileText}
            />
          </div>
          {customer.address && (
            <>
              <p className="text-xs leading-relaxed uppercase">
                {customer.address.street}, {customer.address.number || "S/N"}
                {customer.address.complement &&
                  `, ${customer.address.complement}`}
                <br />
                {customer.address.neighborhood} - {customer.address.city}/
                {customer.address.state} -{" "}
                {formatZipCode(customer.address.zipcode) || "Não informado"}
              </p>
            </>
          )}
        </div>
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
