import { Header } from "../components/header";

import { OrderInfo } from "../components/order-info";
import { ClientInfo } from "../components/client-info";
import { ItemsTable } from "../components/items-table";
import { Resume } from "../components/resume";
import { Pagination } from "../components/pagination";
import { Separator } from "../components/ui/separator";

export function Report({ data }) {
  if (!data) {
    return null;
  }
  const customer = data?.customer;
  const organization = data?.organization;

  return (
    <>
      <Pagination
        name={organization?.name}
        sid={data?.number}
        type={data.type}
      />
      <Header organization={organization} />
      <Separator />
      <div className="space-y-4 mt-1">
        <OrderInfo data={data} />

        <ClientInfo customer={customer} />

        <ItemsTable items={data.items} type={data.type} />

        <Resume
          items={data.items}
          discount={data.discount}
          discount_type={data.discount_type}
          discount_value={data.discount_value}
          subtotal={data.sub_total}
          total={data.total}
        />

        {data.notes && (
          <div className="text-sm w-full">
            <h3 className="font-semibold text-gray-900">Observações</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line">{data.notes}</p>
            </div>
          </div>
        )}

        <div className="page-break-avoid text-sm text-gray-600">
          <h3 className="font-semibold text-gray-600">Termos e Condições</h3>
          <ul className="list-disc list-inside p-3">
            <li>
              Esta ordem de serviço está sujeita às condições gerais de
              prestação de serviços.
            </li>
            <li>
              Os valores e prazos estão sujeitos a alteração mediante acordo
              entre as partes.
            </li>
            <li>
              Para dúvidas ou alterações, entre em contato através dos dados
              informados.
            </li>
            <li>
              Todos os serviços incluem garantia conforme especificado no
              contrato.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
