import "@babel/register";
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { renderToString } from "react-dom/server";

import { generatePDF } from "./utils/generator.js";
import { generateReportHTML } from "./utils/render.js";
import { Report } from "./templates/report.jsx";

const app = express();
const PORT = process.env.PORT || 3334;

dotenv.config();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
  }),
);
app.use(express.json());

app.post("/report", async (req, res) => {
  const data = req.body;

  const cssPath = path.resolve("public/output.css");
  const css = fs.readFileSync(cssPath, "utf8");

  const html = renderToString(<Report data={data} />);

  const title = `${data.type === "budget" ? "Orçamento" : "Ordem"} - ${data.number.replace("/", "-")}`;

  const fullHtml = generateReportHTML({
    title: title,
    content: html,
    styles: css,
  });

  try {
    if (process.env.NODE_ENV === "development") {
      const tempHtmlPath = path.join(
        `tmp/report-${data.sid}-${data.type}.html`,
      );
      fs.writeFileSync(tempHtmlPath, fullHtml);
    }

    // Gerar PDF usando WeasyPrint via Python
    const pdfBuffer = await generatePDF(fullHtml);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="document.pdf"`);
    res.setHeader("Content-Length", pdfBuffer.length);
    res.send(pdfBuffer);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(
    `Servidor rodando na porta http://${process.env.HOST || "localhost"}:${PORT}`,
  );
});
