import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Separator } from "../components/ui/separator";

import { OrderInfo } from "../components/order-info";
import { ClientInfo } from "../components/client-info";
import { ItemsTable } from "../components/items-table";
import { Resume } from "../components/resume";

export function Order({ order }) {
  const customer = order?.customer;
  const organization = order?.organization;

  return (
    <>
      <Header type="order" organization={organization} sid={order?.number} />
      <Footer name={organization?.name} />
      <Separator />

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="col-span-2 w-2/3">
            <OrderInfo data={order} />
          </div>

          <div className="col-span-1 w-1/3">
            <ClientInfo customer={customer} />
          </div>
        </div>

        <ItemsTable items={order.items} type="order" />

        <Resume
          items={order.items}
          discount={order.discount}
          discount_type={order.discount_type}
          discount_value={order.discount_value}
          subtotal={order.sub_total}
          total={order.total}
        />

        {order.description && (
          <div className="page-break-avoid">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 border-b">
              Descrição do Serviço
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line">
                {order.description}
              </p>
            </div>
          </div>
        )}

        <div className="page-break-avoid text-sm text-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b">
            Termos e Condições
          </h3>
          <div className="space-y-2">
            <p>
              • Esta ordem de serviço está sujeita às condições gerais de
              prestação de serviços.
            </p>
            <p>
              • Os valores e prazos estão sujeitos a alteração mediante acordo
              entre as partes.
            </p>
            <p>
              • Para dúvidas ou alterações, entre em contato através dos dados
              informados.
            </p>
            <p>
              • Todos os serviços incluem garantia conforme especificado no
              contrato.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
