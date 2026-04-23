import { formatDocument, formatPhone, formatZipCode } from "../utils";

const IMG_FALLBACK =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

export function Header({ organization }) {
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

  function generateLogoUrl() {
    if (company.logo) {
      const dotIndex = company.logo.lastIndexOf(".");
      const hasExtension = dotIndex > -1;
      const extension = hasExtension ? company.logo.slice(dotIndex) : "";
      const baseUrl = hasExtension
        ? company.logo.slice(0, dotIndex)
        : company.logo;
      const fileExtension = `_96x96${extension}`;

      return process.env.CDN_URL + "/" + baseUrl + fileExtension;
    }

    return IMG_FALLBACK;
  }

  return (
    <>
      <div className="page-break-avoid flex gap-2 mb-2">
        <div className="size-20 overflow-hidden rounded-md">
          <img
            src={generateLogoUrl()}
            alt="Logo da Empresa"
            className="w-full h-full object-cover bg-primary/50"
          />
        </div>
        <div className="w-full flex-1">
          <h1 className="text-xl font-bold text-gray-900">
            {company.name.toUpperCase()}
          </h1>
          <div className="text-xs text-gray-600 grid grid-cols-2">
            <div>
              <p>
                {`${company.address?.street}, ${company.address?.number} - ${company.address?.complement}`}
              </p>
              <p>{`${company.address?.city} - ${company.address?.neighborhood} - ${company.address?.state}`}</p>
              <p>{`${formatZipCode(company.address?.zipcode)}`}</p>
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
