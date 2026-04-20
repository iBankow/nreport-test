import {
  formatDate,
  formatDocument,
  formatPhone,
  formatZipCode,
} from "../utils";

export function Header({ organization, sid, type }) {
  const company = organization || {
    id: "00000000-00000-0000-0000-000000000000",
    name: "SUA EMPRESA LTDA.",
    description: "ORGANIZAÇÃO DE NOME TESTE",
    document: "12312312000128",
    phone: "65984402010",
    email: "ASDADS@EMAIL.COM",
    created_at: "2025-11-27T01:34:40.840Z",
    updated_at: "2025-12-03T23:05:42.487Z",
    deleted_at: null,
    address: {
      street: "RUA DAS  EMPRESAS, 123",
      city: "SÃO PAULO",
      state: "SP",
      zipcode: "01000000",
    },
  };

  const currentDate = formatDate(new Date().toISOString());
  const count = sid || "00001/2026";
  const headerContent =
    type === "order" ? `Ordem de Serviço #${count}` : `Orçamento #${count}`;

  function generateLogoUrl() {
    if (company.logo) {
      const fileExtension = `_64x64` + company.logo.slice(-4);

      const baseUrl = company.logo.slice(0, -4);

      return process.env.CDN_URL + "/" + baseUrl + fileExtension;
    }

    return null;
  }

  return (
    <>
      <p className="header header-left">{headerContent}</p>
      <p className="header header-right">Data de emissão: {currentDate}</p>
      <div className="page-break-avoid header-section flex gap-2">
        <div className="size-20 overflow-hidden">
          <img
            src={generateLogoUrl()}
            alt="Logo da Empresa"
            className="w-full object-cover aspect-square rounded-md"
          />
        </div>
        <div className="w-full">
          <h1 className="text-xl font-bold text-gray-900">
            {company.name.toUpperCase()}
          </h1>
          <div className="text-xs text-gray-600 grid grid-cols-2">
            <div>
              <p>{company.address?.street}</p>
              <p>{`${company.address?.city} - ${company.address?.state}`}</p>
              <p>{`CEP: ${formatZipCode(company.address?.zipcode)}`}</p>
            </div>
            <div>
              <p>{`Tel: ${formatPhone(company.phone)}`}</p>
              <p>{`Email: ${company.email.toLowerCase()}`}</p>
              <p>{`CNPJ: ${formatDocument(company.document)}`}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
