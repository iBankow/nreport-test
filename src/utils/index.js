export function formatZipCode(value) {
  if (!value) {
    return "";
  }

  const str = value.replace(/\D/g, "").slice(0, 8); // remove caracteres não numéricos

  return str.replace(/(\d{5})(\d{3})/, "$1-$2");
}

export function formatPhone(value) {
  // Remove all non-numeric characters
  if (!value) {
    return "";
  }

  const str = value.replace(/\D/g, "").slice(0, 14); // remove caracteres não numéricos

  return str.length <= 10
    ? str.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2")
    : str
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{1})(\d{4})(\d)/, "$1 $2-$3")
        .slice(0, 16);
}

export function formatDocument(value) {
  if (!value) {
    return "";
  }

  const str = value.replace(/[^*\d]/g, "").slice(0, 18); // remove caracteres não numéricos, exceto asteriscos

  if (str.length <= 11) {
    return str
      .replace(/([\d*]{3})([\d*])/, "$1.$2")
      .replace(/([\d*]{3})([\d*])/, "$1.$2")
      .replace(/([\d*]{3})([\d*]{1,2})$/, "$1-$2")
      .slice(0, 14);
  } else {
    return str
      .replace(/([\d*]{2})([\d*])/, "$1.$2")
      .replace(/([\d*]{3})([\d*])/, "$1.$2")
      .replace(/([\d*]{3})([\d*])/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})$/, "$1-$2")
      .slice(0, 18);
  }
}

export const MAX_CURRENCY_VALUE = 2_147_483_647;

export function formatCurrency(str) {
  if (!str) return "R$ 0,00";

  const value =
    typeof str === "number"
      ? str / 100
      : Number(str.replace(/\D/g, "").slice(0, 16)) / 100;

  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatDate(str) {
  if (!str) return "--";

  return new Date(str).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatDateTime(str) {
  if (!str) return "--";

  return new Date(str).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function statusFormat(status) {
  const traducoes = {
    pending: "Pendente",
    in_progress: "Em Andamento",
    completed: "Concluído",
    cancelled: "Cancelado",
  };
  return traducoes[status] || status;
}

export function categoryFormat(category) {
  const categories = [
    {
      id: 1,
      name: "Manutenção",
      description: "Serviços de manutenção preventiva e corretiva",
    },
    {
      id: 2,
      name: "Instalação",
      description: "Instalação de equipamentos e sistemas",
    },
    {
      id: 3,
      name: "Reparo",
      description: "Reparos e consertos em geral",
    },
    {
      id: 4,
      name: "Consultoria",
      description: "Serviços de consultoria técnica",
    },
  ];

  return (
    categories.find((cat) => String(cat.id) === category)?.name ||
    "Não informado"
  );
}
