import { spawn } from "child_process";
import path from "path";

/**
 * Gera PDF usando o script Python com WeasyPrint
 * @param {string} htmlContent - Conteúdo HTML completo para conversão
 * @returns {Promise<Buffer>} - Buffer contendo o PDF gerado
 */
export const generatePDF = (htmlContent) => {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = path.resolve("python/script.py");

    // Spawn do processo Python
    const pythonProcess = spawn("python3", [pythonScriptPath]);

    const chunks = [];
    const errorChunks = [];

    // Coletar dados do stdout (PDF)
    pythonProcess.stdout.on("data", (data) => {
      chunks.push(data);
    });

    // Coletar erros do stderr
    pythonProcess.stderr.on("data", (data) => {
      errorChunks.push(data);
    });

    // Quando o processo terminar
    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        const errorMessage = Buffer.concat(errorChunks).toString();
        // logger.error(`Erro no gerador Python (código ${code}): ${errorMessage}`);
        reject(new Error(`Falha ao gerar PDF: ${errorMessage}`));
        return;
      }

      // Retornar o buffer do PDF
      const pdfBuffer = Buffer.concat(chunks);
      
      if (pdfBuffer.length === 0) {
        // logger.error("PDF gerado está vazio");
        reject(new Error("PDF gerado está vazio"));
        return;
      }

      // logger.info(`PDF gerado com sucesso (${pdfBuffer.length} bytes)`);
      resolve(pdfBuffer);
    });

    // Erro ao spawnar o processo
    pythonProcess.on("error", (error) => {
      // logger.error(`Erro ao executar Python: ${error.message}`);
      reject(new Error(`Erro ao executar gerador de PDF: ${error.message}`));
    });

    // Enviar HTML via stdin
    try {
      const inputData = JSON.stringify({ html: htmlContent });
      pythonProcess.stdin.write(inputData);
      pythonProcess.stdin.end();
    } catch (error) {
      // logger.error(`Erro ao enviar dados para Python: ${error.message}`);
      reject(new Error(`Erro ao enviar HTML: ${error.message}`));
    }
  });
};