const ReactDOMServer = require("react-dom/server");
const fs = require("fs");
const path = require("path");

// Função para renderizar HTML completo
const renderToHTML = (component, title = "Orçamento") => {
  const componentHTML = ReactDOMServer.renderToStaticMarkup(component);

  // Usar CSS otimizado para WeasyPrint
  const pdfStylesPath = path.join(__dirname, "../output.css");
  let cssContent = "";

  // Tentar ler o arquivo CSS otimizado para PDF
  if (fs.existsSync(pdfStylesPath)) {
    cssContent = fs.readFileSync(pdfStylesPath, "utf8");
  } else {
    console.warn("⚠️  styles-pdf.css não encontrado, usando CSS inline básico");
  }

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        ${cssContent}
    </style>
</head>
<body>
    ${componentHTML}
</body>
</html>`;
};

module.exports = {
  renderToHTML,
};
