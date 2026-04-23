#!/usr/bin/env python3
"""
PDF Generator usando WeasyPrint
Recebe HTML via stdin e gera PDF via stdout
"""
import sys
import json
import logging
from weasyprint import HTML
from io import BytesIO

# Configurar logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


def generate_pdf(html_content: str) -> bytes:
    """
    Gera PDF a partir do conteúdo HTML
    
    Args:
        html_content: String contendo o HTML completo
        
    Returns:
        bytes: Conteúdo do PDF gerado
    """
    try:
        # Criar objeto HTML do WeasyPrint
        html = HTML(string=html_content)
        
        # Gerar PDF em memória
        pdf_buffer = BytesIO()
        html.write_pdf(pdf_buffer)
        
        # Retornar bytes do PDF
        pdf_buffer.seek(0)
        return pdf_buffer.read()
        
    except Exception as e:
        logger.error(f"Erro ao gerar PDF: {str(e)}")
        raise


def main():
    """
    Função principal que lê HTML do stdin e escreve PDF para stdout
    """
    try:
        # Ler dados do stdin
        input_data = sys.stdin.read()
        
        if not input_data:
            logger.error("Nenhum dado recebido")
            sys.exit(1)
        
        # Parse do JSON de entrada
        data = json.loads(input_data)
        html_content = data.get('html')
        
        if not html_content:
            logger.error("HTML não encontrado nos dados de entrada")
            sys.exit(1)
        
        # Gerar PDF
        pdf_bytes = generate_pdf(html_content)
        
        # Escrever PDF para stdout (em modo binário)
        sys.stdout.buffer.write(pdf_bytes)
        
    except json.JSONDecodeError as e:
        logger.error(f"Erro ao decodificar JSON: {str(e)}")
        sys.exit(1)
    except Exception as e:
        logger.error(f"Erro inesperado: {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    main()