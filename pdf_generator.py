#!/usr/bin/env python3
"""
Gerador de PDF usando WeasyPrint com CSS Paged Media Module Level 3
"""

import sys
import json
import os
from datetime import datetime, timedelta
from weasyprint import HTML, CSS
from weasyprint.text.fonts import FontConfiguration

def generate_pdf(html_content, output_path, orcamento_data):
    """
    Gera PDF a partir de conteúdo HTML usando WeasyPrint
    
    Args:
        html_content (str): Conteúdo HTML para conversão
        output_path (str): Caminho do arquivo PDF de saída
        orcamento_data (dict): Dados do orçamento para cabeçalhos/rodapés
    """
    try:
        # Configuração de fontes
        font_config = FontConfiguration()
        
        # Adicionar metadados aos atributos HTML
        numero = orcamento_data.get('numero', 'N/A')
        data_orcamento = orcamento_data.get('data', datetime.now().strftime('%d/%m/%Y'))
        empresa = orcamento_data.get('empresa', 'Empresa XYZ Ltda.')
        cliente = orcamento_data.get('cliente', 'Cliente')
        
        # Calcular data de validade (30 dias a partir de hoje)
        validade = datetime.now() + timedelta(days=20)
        data_validade = validade.strftime('%d/%m/%Y')
        
        # Adicionar atributos de dados ao HTML
        # Suporta tanto <html> quanto <html lang="...">
        html_with_attrs = html_content.replace(
            '<html',
            f'<html data-numero="{numero}" data-data="{data_orcamento}" '
            f'data-empresa="{empresa}" data-validade="{data_validade}" ',
            1  # Substituir apenas a primeira ocorrência
        )
        
        # CSS customizado para o PDF
        css_content = """
        @page {
            size: A4;
            margin: 10mm;
            
            @top-left {
                content: "Orçamento #$NUMERO";
                font-family: Arial, sans-serif;
                font-size: 10pt;
                color: #666;
            }
            
            @top-right {
                content: "Data: $DATA_ORCAMENTO";
                font-family: Arial, sans-serif;
                font-size: 10pt;
                color: #666;
            }
            
            @bottom-left {
                content: "$EMPRESA";
                font-family: Arial, sans-serif;
                font-size: 9pt;
                color: #888;
            }
            
            @bottom-center {
                content: "Página " counter(page) " de " counter(pages);
                font-family: Arial, sans-serif;
                font-size: 9pt;
                color: #888;
                text-align: center;
            }
            
            @bottom-right {
                content: "Válido até: $VALIDADE";
                font-family: Arial, sans-serif;
                font-size: 9pt;
                color: #888;
            }
        }
        
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            -webkit-print-color-adjust: exact;
        }
        
        .page-break-before { page-break-before: always; }
        .page-break-after { page-break-after: always; }
        .page-break-avoid { page-break-inside: avoid; }
        """

        css_content = css_content.replace('$NUMERO', orcamento_data.get('numero', ''), 1)
        css_content = css_content.replace('$DATA_ORCAMENTO', orcamento_data.get('data', ''), 1)
        css_content = css_content.replace('$EMPRESA', orcamento_data.get('empresa', ''), 1)
        css_content = css_content.replace('$VALIDADE', data_validade, 1)

        # Criar objetos WeasyPrint
        html_doc = HTML(string=html_with_attrs)
        css_doc = CSS(string=css_content, font_config=font_config)
        
        # Gerar PDF
        html_doc.write_pdf(output_path, stylesheets=[css_doc], font_config=font_config)
        
        return {
            'success': True,
            'output_path': output_path,
            'message': f'PDF gerado com sucesso: {output_path}'
        }
        
    except Exception as e:
        return {
            'success': False,
            'error': str(e),
            'message': f'Erro ao gerar PDF: {str(e)}'
        }

def main():
    """Função principal para execução via linha de comando"""
    if len(sys.argv) < 4:
        print("Uso: python pdf_generator.py <html_file> <output_pdf> <orcamento_data_json>")
        sys.exit(1)
    
    html_file = sys.argv[1]
    output_pdf = sys.argv[2]
    orcamento_data_json = sys.argv[3]
    
    try:
        # Ler conteúdo HTML
        with open(html_file, 'r', encoding='utf-8') as f:
            html_content = f.read()
        
        # Parsear dados do orçamento
        orcamento_data = json.loads(orcamento_data_json)
        
        # Gerar PDF
        result = generate_pdf(html_content, output_pdf, orcamento_data)
        
        # Retornar resultado
        print(json.dumps(result))
        
        if result['success']:
            sys.exit(0)
        else:
            sys.exit(1)
            
    except Exception as e:
        error_result = {
            'success': False,
            'error': str(e),
            'message': f'Erro na execução: {str(e)}'
        }
        print(json.dumps(error_result))
        sys.exit(1)

if __name__ == "__main__":
    main()