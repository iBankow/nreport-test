const React = require("react");

const ServiceOrderComponent = ({ order, customer, items, organization }) => {
  // Destructuring dos dados da ordem
  const {
    id,
    sid,
    number,
    status,
    priority,
    title,
    description,
    notes,
    category,
    cost,
    sub_total,
    total,
    discount_type,
    discount,
    estimated_completion,
    start_date,
    end_date,
    created_at,
    updated_at,
  } = order || {};

  // Destructuring dos dados do cliente
  const {
    name: customerName,
    email: customerEmail,
    phone: customerPhone,
    document: customerDocument,
    type: customerType,
    address: customerAddress,
  } = customer || {};

  // Dados da organização/empresa
  const empresa = organization?.name || {
    name: "SUA EMPRESA LTDA.",
    address: {
      street: "RUA DAS  EMPRESAS, 123",
      city: "SÃO PAULO",
      state: "SP",
      zipcode: "01000-000",
    },
    phone: "(11) 9999-9999",
    document: "12.345.678/0001-99",
    email: "CONTATO@SUAEMPRESA.COM.BR",
  };

  const calcularTotalPorCategoria = (categoria) => {
    if (!items || items.length === 0) return 0;
    return items
      .filter((item) => item.category === categoria)
      .reduce((total, item) => total + (item.total || 0), 0);
  };

  const formatarMoeda = (valor) => {
    // Valores já vêm em centavos da API
    const valorEmReais = valor / 100;
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valorEmReais);
  };

  const formatarDocumento = (doc, tipo) => {
    if (!doc) return "";
    if (tipo === "individual") {
      // CPF: 000.000.000-00
      return doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else {
      // CNPJ: 00.000.000/0000-00
      return doc.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
      );
    }
  };

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString("pt-BR");
  };

  const formatarDataHora = (data) => {
    return new Date(data).toLocaleString("pt-BR");
  };

  const obterCorStatus = (status) => {
    const cores = {
      pending: "bg-yellow-100 text-yellow-800",
      in_progress: "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return cores[status] || "bg-gray-100 text-gray-800";
  };

  const obterCorPrioridade = (priority) => {
    const cores = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-orange-100 text-orange-800",
      urgent: "bg-red-100 text-red-800",
    };
    return cores[priority] || "bg-gray-100 text-gray-800";
  };

  const traduzirCategoria = (category) => {
    const traducoes = {
      service: "Serviço",
      material: "Material",
      equipment: "Equipamento",
      labor: "Mão de obra",
    };
    return traducoes[category] || category;
  };

  const traduzirStatus = (status) => {
    const traducoes = {
      pending: "Pendente",
      in_progress: "Em Andamento",
      completed: "Concluído",
      cancelled: "Cancelado",
    };
    return traducoes[status] || status;
  };

  const traduzirPrioridade = (priority) => {
    const traducoes = {
      low: "Baixa",
      medium: "Média",
      high: "Alta",
      urgent: "Urgente",
    };
    return traducoes[priority] || priority;
  };

  const traduzirTipoDesconto = (tipo) => {
    return tipo === "percentage" ? "Percentual" : "Valor Fixo";
  };

  const formatarTelefone = (telefone) => {
    if (!telefone) return "";
    // Formatar telefone brasileiro
    const cleaned = ("" + telefone).replace(/\D/g, "");
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return telefone;
  };

  const formatarEndereço = () => {
    if (!customerAddress) return "";
    let address = "";
    for (const [key, value] of Object.entries(customerAddress)) {
      if (value) {
        address += `${value} - `;
      }
    }
    return address.slice(0, -3); // Remove a última vírgula e espaço
  };

  // Usar valores da API, com fallback para cálculo manual
  const subtotal = sub_total;
  const descontoValor = discount;
  const totalFinal = total || subtotal - descontoValor;
  const categorias = ["service", "material", "equipment", "labor"];

  const totalCategorias = items.reduce((acc, item) => {
    if (!acc.includes(item.category)) {
      acc.push(item.category);
    }
    return acc;
  }, []).length;

  const totalPorCategoria = categorias
    .map((categoria) => {
      return {
        categoria,
        total: calcularTotalPorCategoria(categoria),
      };
    })
    .filter((cat) => cat.total > 0);

  return (
    <div className="orcamento-container">
      {/* Dados da empresa */}
      <div className="page-break-avoid header-section flex gap-2 border-b pb-1">
        <img
          src={
            empresa.logoUrl ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/768px-LEGO_logo.svg.png"
          }
          alt="Logo da Empresa"
          className="w-20 h-w-20 bg-red-400 object-cover aspect-square rounded-md"
        />
        <div className="w-full">
          <h1 className="text-xl font-bold text-gray-900">
            {empresa.name || empresa.nome || "Sua Empresa Ltda."}
          </h1>
          <div className="text-xs text-gray-600 grid grid-cols-2">
            <div>
              <p>{empresa.address?.street}</p>
              <p>{`${empresa.address?.city} - ${empresa.address?.state}`}</p>
              <p>{`CEP: ${empresa.address?.zipcode}`}</p>
            </div>
            <div>
              <p>{`Tel: ${empresa.phone}`}</p>
              <p>{`Email: ${empresa.email}`}</p>
              <p>{`CNPJ: ${empresa.document || empresa.cnpj}`}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dados do cliente */}
      <div className="page-break-avoid text-sm">
        <h3 className="text-lg font-semibold text-gray-900 border-b">
          Dados do Cliente
        </h3>
        <div className="mt-1">
          <div className="flex justify-between items-center">
            <p className="font-bold">
              NOME: {customerName || "Nome do Cliente"}
            </p>
            <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
              {customerType === "company" ? "Pessoa Jurídica" : "Pessoa Física"}
            </span>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">
              EMAIL: {customerEmail || "email@cliente.com"}
            </p>
            {customerPhone && (
              <p className="text-gray-600">
                TEL.: {formatarTelefone(customerPhone)}
              </p>
            )}
            {customerDocument && (
              <p className="text-gray-600">
                {customerType === "company" ? "CNPJ: " : "CPF: "}
                {formatarDocumento(customerDocument, customerType)}
              </p>
            )}
          </div>
        </div>
        {customerAddress && customerAddress.street && (
          <p className="text-gray-600">ENDEREÇO: {formatarEndereço()}</p>
        )}
      </div>

      {/* Dados da ordem de serviço */}
      <div className="page-break-avoid">
        <div className="bg-gray-100 rounded-md p-3 space-y-2">
          <div className="flex justify-between items-start">
            {title && (
              <p className="text-gray-900 text-lg font-medium">{title}</p>
            )}
            <h2 className="text-xl font-bold">#{number}</h2>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs">Status</p>
              <span
                className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${obterCorStatus(
                  status
                )}`}
              >
                {traduzirStatus(status)}
              </span>
            </div>

            <div>
              <p className="text-xs">Prioridade</p>
              <span
                className={`inline-block px-3 py-1 rounded-md text-xs font-semibold ${obterCorPrioridade(
                  priority
                )}`}
              >
                {traduzirPrioridade(priority)}
              </span>
            </div>

            {updated_at && updated_at !== created_at && (
              <div>
                <p className="text-xs">Última Atualização</p>
                <p className="font-semibold text-sm">
                  {formatarData(updated_at)}
                </p>
              </div>
            )}

            <div>
              <p className="text-sm">Emitida em</p>
              <p className="font-semibold">{formatarData(created_at)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cronograma (se houver datas) */}
      {/* {(start_date || end_date || estimated_completion) && (
        <div className="page-break-avoid">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b">
            Cronograma do Serviço
          </h3>
          <div className="grid grid-cols-3 gap-6 bg-blue-50 p-4 rounded-lg">
            {start_date && (
              <div>
                <p className="font-medium text-blue-900">Data de Início</p>
                <p className="text-blue-700">{formatarDataHora(start_date)}</p>
              </div>
            )}
            {end_date && (
              <div>
                <p className="font-medium text-blue-900">Data de Conclusão</p>
                <p className="text-blue-700">{formatarDataHora(end_date)}</p>
              </div>
            )}
            {estimated_completion && (
              <div>
                <p className="font-medium text-blue-900">Previsão de Entrega</p>
                <p className="text-blue-700">
                  {formatarDataHora(estimated_completion)}
                </p>
              </div>
            )}
          </div>
        </div>
      )} */}

      {/* Tabela de itens */}
      <div className="break-inside-auto mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b">
          {items && items.length > 1 ? "Itens" : "Item"} da Ordem de Serviço
        </h3>
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
          <tbody className="border-x">
            {items && items.length > 0 ? (
              items.map((item, index) => (
                <tr
                  key={item.id || index}
                  className="item-row border-b border-gray-300"
                >
                  <td className="p-1.5 font-medium text-center">{index + 1}</td>
                  <td className="p-1.5 w-1/2" width="50%">
                    {item.description || "Descrição do Item"}
                  </td>
                  <td className="p-1.5 text-center">
                    <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                      {traduzirCategoria(item.category)}
                    </span>
                  </td>
                  <td className="p-1.5 text-center">{item.quantity}</td>
                  <td className="p-1.5 text-right">
                    {formatarMoeda(item.price)}
                  </td>
                  <td className="p-1.5 text-right font-medium">
                    {formatarMoeda(item.total)}
                  </td>
                </tr>
              ))
            ) : (
              <tr key="empty">
                <td
                  colSpan="6"
                  className="border border-gray-300 px-4 py-8 text-center text-gray-500"
                >
                  Nenhum item foi adicionado à ordem de serviço
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Resumo por categoria */}
      {/* Total geral */}
      <div className="page-break-avoid grid grid-cols-2 gap-2">
        {totalCategorias >= 3 && (
          <div className="w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b">
              Resumo por Categoria
            </h3>
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 text-center border-b border-gray-300">
                      Item
                    </th>
                    <th className="p-2 text-left border-b border-gray-300">
                      Categoria
                    </th>
                    <th className="p-2 text-right border-b border-gray-300">
                      Total
                    </th>
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
                          {formatarMoeda(categoria.total)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="total-section w-full h-full flex flex-col col-start-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b">
            Total Geral
          </h3>
          <div className=" bg-blue-50 p-4 rounded-lg h-full flex flex-col justify-end">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700">Subtotal:</span>
                <span className="font-medium">{formatarMoeda(subtotal)}</span>
              </div>

              {descontoValor > 0 && (
                <>
                  <div className="flex justify-between text-sm text-red-600">
                    <span>
                      Desconto ({traduzirTipoDesconto(discount_type)}):
                    </span>
                    <span className="font-medium">
                      -{formatarMoeda(descontoValor)}
                    </span>
                  </div>
                </>
              )}

              <div className="flex justify-between py-2 border-t-2 border-blue-900 text-lg font-bold text-blue-900">
                <span>Total Geral:</span>
                <span>{formatarMoeda(totalFinal)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Observações */}
      {notes && (
        <div className="page-break-avoid mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b">
            Observações
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 whitespace-pre-line">{notes}</p>
          </div>
        </div>
      )}

      {/* Descrição do serviço */}
      {description && (
        <div className="page-break-avoid">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 border-b">
            Descrição do Serviço
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 whitespace-pre-line">{description}</p>
          </div>
        </div>
      )}

      {/* Termos e condições */}
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
          {cost && <p>• Custo estimado: {formatarMoeda(cost)}</p>}
        </div>
      </div>

      {/* Assinatura */}
      {/* <div className="pt-8">
        <div className="grid grid-cols-3 gap-8">
          <div className="text-center">
            <div className="border-b border-gray-400 mb-2 h-12"></div>
            <p className="text-sm text-gray-600">Responsável Técnico</p>
          </div>
          <div className="text-center">
            <div className="border-b border-gray-400 mb-2 h-12"></div>
            <p className="text-sm text-gray-600">Cliente</p>
          </div>
          <div className="text-center">
            <div className="border-b border-gray-400 mb-2 h-12"></div>
            <p className="text-sm text-gray-600">Data: ____/____/_____</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

module.exports = ServiceOrderComponent;
