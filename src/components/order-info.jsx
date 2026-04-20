import {
  categoryFormat,
  formatCurrency,
  formatDate,
  statusFormat,
} from "../utils";

import { Calendar, Clock, DollarSign, FileText, Tag, User } from "lucide-react";

export function OrderInfo({ data }) {
  return (
    <div className="bg-gray-100 rounded-md p-3 space-y-2 h-full">
      <h3 className="text-lg font-semibold text-gray-900 ">
        {data.type === "order"
          ? "Dados da Ordem de Serviço"
          : "Dados do Orçamento"}
      </h3>
      <div className="grid gap-4 grid-cols-2">
        <div>
          <div className="flex items-center gap-2 ">
            <FileText className="text-muted-foreground size-4" />
            <div>
              <span className="text-muted-foreground text-sm">Título</span>
              <p className="font-bold">{data.title || "Não informado"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="text-muted-foreground size-4" />
            <div>
              <span className="text-muted-foreground text-sm">Categoria</span>
              <p className="font-bold">{categoryFormat(data.category)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <User className="text-muted-foreground size-4" />
            <div>
              <span className="text-muted-foreground text-sm">Status</span>
              <p className="font-bold">{statusFormat(data.status)}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="text-muted-foreground size-4" />
            <div>
              <span className="text-muted-foreground text-sm">Criado em</span>
              <p className="font-bold">{formatDate(data.created_at)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="text-muted-foreground size-4" />
            <div>
              <span className="text-muted-foreground text-sm">
                Previsão de Conclusão
              </span>
              <p className="font-bold">{formatDate(data.estimated_at)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DollarSign className="text-muted-foreground size-4" />
            <div>
              <span className="text-muted-foreground text-sm">Valor Total</span>
              <p className="text-blue-500 text-lg font-bold">
                {formatCurrency(data.total)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
