import {
  formatDate,
  formatDocument,
  formatPhone,
  formatZipCode,
} from "../utils";

export function Header({ organization, sid, type }) {
  const empresa = organization || {
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

  return (
    <>
      <p className="header header-left">{headerContent}</p>
      <p className="header header-right">Data de emissão: {currentDate}</p>
      <div className="page-break-avoid header-section flex gap-2">
        <img
          src={
            empresa.logo ||
            "https://img.freepik.com/vetores-gratis/vetor-de-gradiente-de-logotipo-colorido-de-passaro_343694-1365.jpg?semt=ais_hybrid&w=740&q=80"
          }
          alt="Logo da Empresa"
          className="w-20 object-cover aspect-square rounded-md"
        />
        <div className="w-full">
          <h1 className="text-xl font-bold text-gray-900">
            {empresa.name.toUpperCase()}
          </h1>
          <div className="text-xs text-gray-600 grid grid-cols-2">
            <div>
              <p>{empresa.address?.street}</p>
              <p>{`${empresa.address?.city} - ${empresa.address?.state}`}</p>
              <p>{`CEP: ${formatZipCode(empresa.address?.zipcode)}`}</p>
            </div>
            <div>
              <p>{`Tel: ${formatPhone(empresa.phone)}`}</p>
              <p>{`Email: ${empresa.email.toLowerCase()}`}</p>
              <p>{`CNPJ: ${formatDocument(empresa.document)}`}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
