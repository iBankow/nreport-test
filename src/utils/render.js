import fs from "fs";
import path from "path";

/**
 * Renderiza HTML a partir de um template
 * @param {string} templatePath - Caminho para o arquivo template
 * @param {Object} replacements - Objeto com as substituições a serem feitas
 * @returns {string} HTML renderizado
 */
export const renderTemplate = (templatePath, replacements) => {
  let template = fs.readFileSync(templatePath, "utf8");

  // Substituir todas as variáveis no formato {{VARIABLE}}
  Object.entries(replacements).forEach(([key, value]) => {
    const placeholder = `{{${key}}}`;
    template = template.replace(new RegExp(placeholder, "g"), value);
  });

  return template;
};

/**
 * Gera HTML completo para o relatório
 * @param {Object} options - Opções de renderização
 * @param {string} options.title - Título do documento
 * @param {string} options.content - Conteúdo HTML renderizado
 * @param {string} options.styles - CSS inline
 * @returns {string} HTML completo
 */
export const generateReportHTML = ({ title, content, styles }) => {
  const templatePath = path.resolve("public/index.html");

  return renderTemplate(templatePath, {
    TITLE: title,
    CONTENT: content,
    STYLES: styles,
  });
};
