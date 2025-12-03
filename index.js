// Configuração do Babel para suporte JSX
require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

const express = require("express");
const React = require("react");
const path = require("path");
const { spawn } = require("child_process");
const fs = require("fs-extra");
const { v4: uuidv4 } = require("uuid");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const OrcamentoComponent = require("./components/ServiceOrderComponent");
const { renderToHTML } = require("./utils/ssr");

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // máximo 100 requests por IP
  message: {
    error: "Muitas requisições. Tente novamente em 15 minutos.",
  },
});

app.use("/api/", limiter);

// Diretórios para arquivos temporários
const TEMP_DIR = path.join(__dirname, "temp");
const PDF_DIR = path.join(__dirname, "pdfs");

// Criar diretórios se não existirem
fs.ensureDirSync(TEMP_DIR);
fs.ensureDirSync(PDF_DIR);

// Servir arquivos estáticos
app.use("/pdfs", express.static(PDF_DIR));

// Função para gerar PDF usando WeasyPrint
async function generatePDF(htmlContent, outputPath, orcamentoData) {
  return new Promise((resolve, reject) => {
    // Criar arquivo HTML temporário
    const tempHtmlFile = path.join(TEMP_DIR, `temp_${uuidv4()}.html`);

    try {
      // Escrever HTML no arquivo temporário
      fs.writeFileSync(tempHtmlFile, htmlContent, "utf8");

      // Chamar o script Python

      const pythonProcess = spawn("python3", [
        path.join(__dirname, "pdf_generator.py"),
        tempHtmlFile,
        outputPath,
        JSON.stringify(orcamentoData),
      ]);

      let stdout = "";
      let stderr = "";

      pythonProcess.stdout.on("data", (data) => {
        stdout += data.toString();
      });

      pythonProcess.stderr.on("data", (data) => {
        stderr += data.toString();
      });

      pythonProcess.on("close", (code) => {
        // Limpar arquivo temporário
        fs.unlink(tempHtmlFile).catch(console.error);

        if (code === 0) {
          try {
            const result = JSON.parse(stdout.trim());
            resolve(result);
          } catch (e) {
            resolve({ success: true, output_path: outputPath });
          }
        } else {
          console.error("Python stderr:", stderr);
          console.error("Python stdout:", stdout);
          console.error("Temp HTML file:", tempHtmlFile);
          reject(
            new Error(
              `Python script failed with code ${code}:\nSTDERR: ${stderr}\nSTDOUT: ${stdout}`
            )
          );
        }
      });

      pythonProcess.on("error", (error) => {
        // Limpar arquivo temporário
        fs.unlink(tempHtmlFile).catch(console.error);
        reject(error);
      });
    } catch (error) {
      console.log(error);
      // Limpar arquivo temporário em caso de erro
      fs.unlink(tempHtmlFile).catch(console.error);
      reject(error);
    }
  });
}

// Rota de teste com dados de exemplo
app.get("/service-order/preview", async (req, res) => {
  try {
    const data = {
      id: "df5fade1-9c4c-4b30-a028-f14f12b65e2c",
      organization_id: "44e90d26-ccc5-4d87-a9f8-260fc0373447",
      customer_id: "538cdb36-efb2-46a2-8a6f-3a11e020b627",
      sid: 2,
      number: "00002/2025",
      status: "in_progress",
      priority: "medium",
      title: "instalação de moveis",
      description: "preços",
      notes: null,
      category: "2",
      estimated_cost: 202221,
      cost: null,
      discount: 2820,
      discount_type: "percentage",
      discount_value: 12,
      sub_total: 23496,
      total: 20676,
      estimated_completion: null,
      start_date: "2025-12-01T23:27:59.814Z",
      end_date: null,
      deleted_at: null,
      created_at: "2025-12-01T23:23:09.661Z",
      updated_at: "2025-12-01T23:28:32.612Z",
      items: [
        {
          id: "f396f207-7099-4190-8d0d-105167515fca",
          order_id: "df5fade1-9c4c-4b30-a028-f14f12b65e2c",
          item_id: "fbd61f5f-3d39-437e-ad0d-c242a0c98d20",
          description: "REWQ",
          quantity: 3,
          price: 430,
          total: 1290,
          category: "equipment",
          unit: null,
          notes: null,
          deleted_at: null,
          created_at: "2025-12-01T23:28:02.485Z",
          updated_at: "2025-12-01T23:28:02.485Z",
        },
        {
          id: "0366b5d0-aaab-4aa1-beee-72bf533cc5de",
          order_id: "df5fade1-9c4c-4b30-a028-f14f12b65e2c",
          item_id: "968631bd-ac7d-4a48-80b2-1d398cdf0654",
          description: "ZXCV",
          quantity: 5,
          price: 3300,
          total: 16500,
          category: "labor",
          unit: null,
          notes: null,
          deleted_at: null,
          created_at: "2025-12-01T23:28:06.742Z",
          updated_at: "2025-12-01T23:28:06.742Z",
        },
        {
          id: "38d0bfb2-3434-47cf-b6d1-d3f3cf5eacd9",
          order_id: "df5fade1-9c4c-4b30-a028-f14f12b65e2c",
          item_id: "ca87698e-2558-42cf-b251-4e9b2777995b",
          description: "QWER",
          quantity: 2,
          price: 653,
          total: 1306,
          category: "service",
          unit: null,
          notes: null,
          deleted_at: null,
          created_at: "2025-12-01T23:28:10.766Z",
          updated_at: "2025-12-01T23:28:10.766Z",
        },
        {
          id: "e6762f57-76dd-4dc7-ba46-34ab7675ac91",
          order_id: "df5fade1-9c4c-4b30-a028-f14f12b65e2c",
          item_id: "ff1fbfad-e0d1-4dbb-8373-02bf1a58f0b6",
          description: "ASDF",
          quantity: 2,
          price: 2200,
          total: 4400,
          category: "service",
          unit: null,
          notes: null,
          deleted_at: null,
          created_at: "2025-12-01T23:27:59.823Z",
          updated_at: "2025-12-01T23:27:59.823Z",
        },
      ],
      customer: {
        id: "538cdb36-efb2-46a2-8a6f-3a11e020b627",
        sid: null,
        organization_id: "44e90d26-ccc5-4d87-a9f8-260fc0373447",
        type: "company",
        name: "EMPRESA ASD",
        email: "empresa@email.com",
        phone: "23912223122",
        document: "32311223123221",
        address: {
          city: "cuiaba",
          state: "mt",
          number: "1233",
          street: "ruas empresa",
          zipcode: "78005100",
          complement: "ed conrdia",
          neighborhood: "centro sul ",
        },
        deleted_at: null,
        created_at: "2025-12-01T23:21:50.017Z",
        updated_at: "2025-12-01T23:21:50.017Z",
      },
      organization: null,
    };

    // Gerar componente React usando a variável data
    const component = React.createElement(OrcamentoComponent, {
      order: data,
      customer: data.customer,
      items: data.items,
      organization: data.organization,
    });

    const html = renderToHTML(
      component,
      `Ordem de Serviço #${data.number} - Preview`
    );

    // Retornar HTML diretamente para preview no navegador
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(html);
  } catch (error) {
    console.error("Erro ao gerar preview:", error);
    res.status(500).json({
      error: "Erro ao gerar preview",
      message: error.message,
    });
  }
});

app.post("/service-order/gerar/pdf", async (req, res) => {
  try {
    const dadosRecebidos = req.body;

    // Extrair order, customer, items e organization do request
    const order = dadosRecebidos;
    const customer = dadosRecebidos.customer || {};
    const items = dadosRecebidos.items || [];
    const organization = dadosRecebidos.organization || {};

    // Gerar componente React com a nova estrutura de props
    const component = React.createElement(OrcamentoComponent, {
      order,
      customer,
      items,
      organization,
    });
    const html = renderToHTML(
      component,
      `Ordem de Serviço #${order.number || order.sid || order.id}`
    );

    // Sanitizar o nome do arquivo removendo caracteres inválidos
    const fileId = (order.number || order.sid || order.id)
      .toString()
      .replace(/[/\\?%*:|"<>]/g, "_");
    const pdfFilename = `service_order_${fileId}.pdf`;
    const pdfPath = path.join(PDF_DIR, pdfFilename);

    // Dados para os marcadores do PDF
    const serviceOrderData = {
      numero: order.number || order.sid || order.id,
      data: new Date(order.created_at).toLocaleDateString("pt-BR"),
      empresa: organization.name || organization.nome || "Sua Empresa Ltda",
      cliente: customer.name || "N/A",
    };

    const result = await generatePDF(html, pdfPath, serviceOrderData);

    if (result.success) {
      res.setHeader("Cache-Control", "public, max-age=1200"); // 20 minutos
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${pdfFilename}"`
      );
      res.setHeader("Content-Length", fs.statSync(pdfPath).size);
      res.sendFile(pdfPath);

      res.on("finish", () => {
        // Opcional: remover o PDF após o envio
        fs.unlink(pdfPath).catch(console.error);
      });
    } else {
      throw new Error(result.message || "Erro ao gerar PDF");
    }
  } catch (error) {
    console.error("Erro ao gerar PDF personalizado:", error);
    res.status(500).json({
      error: "Erro interno do servidor",
      message:
        "Não foi possível gerar o PDF. Verifique se o WeasyPrint está instalado.",
      details: error.message,
    });
  }
});

// Middleware de tratamento de erros 404
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Endpoint não encontrado",
    message: "Verifique a documentação da API em /",
  });
});

// Middleware de tratamento de erros globais
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Erro interno do servidor",
    message: "Algo deu errado!",
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📋 Documentação da API: http://localhost:${PORT}/`);
  console.log(
    `🔗 Exemplo de service order HTML: http://localhost:${PORT}/service-order/exemplo`
  );
  console.log(
    `📄 Exemplo de service order PDF: http://localhost:${PORT}/service-order/exemplo/pdf`
  );
  console.log(`\n⚠️  IMPORTANTE: Certifique-se de ter o WeasyPrint instalado:`);
  console.log(`   pip install weasyprint`);
});

module.exports = app;
