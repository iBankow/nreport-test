# API de Geração de Orçamentos com PDF

Uma API Express moderna para geração de orçamentos com renderização server-side usando React, Tailwind CSS v4 e geração de PDF com WeasyPrint usando CSS Paged Media Module Level 3.

## 🚀 Características

- **Renderização Server-Side**: React com renderização no servidor
- **Geração de PDF**: WeasyPrint com CSS Paged Media Module Level 3
- **Cabeçalhos e Rodapés Dinâmicos**: Marcadores `@page` personalizados
- **Design Moderno**: Tailwind CSS v4 com estilos otimizados para impressão
- **API RESTful**: Endpoints simples e intuitivos
- **Validação de Dados**: Validação completa dos dados de entrada
- **Rate Limiting**: Proteção contra abuso da API

## 📋 Pré-requisitos

- Node.js 18+ 
- Python 3.x
- WeasyPrint

### Instalação do WeasyPrint

```bash
pip install weasyprint
```

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd orcamento-api
```

2. Instale as dependências do Node.js:
```bash
npm install
```

3. Instale o WeasyPrint:
```bash
npm run setup-python
# ou manualmente:
pip install weasyprint
```

4. Inicie o servidor:
```bash
npm start
# ou para desenvolvimento:
npm run dev
```

## 📡 Endpoints da API

### `GET /`
Documentação completa da API com exemplos de uso.

### `GET /orcamento/exemplo`
Gera um orçamento de exemplo em HTML.

### `GET /orcamento/exemplo/pdf`
Gera um orçamento de exemplo em PDF com cabeçalhos e rodapés dinâmicos.

### `POST /orcamento/gerar`
Gera um orçamento personalizado em HTML.

### `POST /orcamento/gerar/pdf`
Gera um orçamento personalizado em PDF.

### `POST /orcamento/dados`
Retorna os dados do orçamento processados em JSON (sem renderização).

## 📄 Estrutura dos Dados

```json
{
  "empresa": {
    "nome": "TechSolutions Ltda",
    "endereco": "Rua das Tecnologias, 123",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "01234-567",
    "telefone": "(11) 3333-4444",
    "email": "contato@empresa.com",
    "cnpj": "12.345.678/0001-90"
  },
  "cliente": {
    "nome": "João Silva",
    "email": "joao@email.com",
    "telefone": "(11) 99999-9999",
    "endereco": "Rua do Cliente, 456",
    "cidade": "São Paulo",
    "estado": "SP",
    "cep": "02000-000"
  },
  "itens": [
    {
      "codigo": "PROD-001",
      "descricao": "Produto ou Serviço",
      "detalhes": "Detalhes adicionais (opcional)",
      "quantidade": 2,
      "unidade": "un",
      "preco": 150.00
    }
  ],
  "numeroOrcamento": "123456",
  "dataOrcamento": "2023-12-01T00:00:00.000Z",
  "observacoes": "Observações especiais do orçamento",
  "validade": 30,
  "desconto": 5,
  "formaPagamento": "50% entrada + 50% entrega",
  "prazoEntrega": "15 dias úteis",
  "status": "Pendente"
}
```

## 🎨 Recursos CSS Paged Media

A geração de PDF utiliza CSS Paged Media Module Level 3 com os seguintes recursos:

### Marcadores @page

- **@top-left**: Número do orçamento
- **@top-right**: Data do orçamento  
- **@bottom-left**: Nome da empresa
- **@bottom-center**: Numeração de páginas
- **@bottom-right**: Data de validade

### Primeira Página

- **@page :first**: Cabeçalho diferenciado para a primeira página
- **@top-center**: Título "ORÇAMENTO OFICIAL"

### Controle de Quebras

- `.page-break-before`: Força quebra antes do elemento
- `.page-break-after`: Força quebra depois do elemento  
- `.page-break-avoid`: Evita quebra dentro do elemento

## 🧪 Testando a API

### Teste de HTML
```bash
curl http://localhost:3000/orcamento/exemplo
```

### Teste de PDF
```bash
curl -o orcamento.pdf http://localhost:3000/orcamento/exemplo/pdf
```

### Criando Orçamento Personalizado
```bash
curl -X POST http://localhost:3000/orcamento/gerar/pdf \
  -H "Content-Type: application/json" \
  -d '{
    "cliente": {
      "nome": "Maria Silva",
      "email": "maria@exemplo.com",
      "telefone": "(11) 88888-8888"
    },
    "itens": [
      {
        "descricao": "Consultoria em TI",
        "quantidade": 10,
        "preco": 200.00
      }
    ]
  }' \
  --output orcamento_personalizado.pdf
```

## 📁 Estrutura do Projeto

```
orcamento-api/
├── components/
│   └── OrcamentoComponent.js    # Componente React do orçamento
├── utils/
│   └── ssr.js                   # Utilitário de renderização SSR
├── temp/                        # Arquivos temporários HTML
├── pdfs/                        # PDFs gerados
├── styles.css                   # CSS com regras @page
├── pdf_generator.py             # Script Python para gerar PDFs
├── index.js                     # Servidor Express principal
├── package.json                 # Dependências do Node.js
└── README.md                    # Este arquivo
```

## 🔒 Segurança

- Rate limiting: 100 requisições por IP a cada 15 minutos
- Validação rigorosa de entrada
- Sanitização de dados
- Limite de tamanho de payload: 10MB

## 🐛 Solução de Problemas

### Erro "WeasyPrint not found"
```bash
pip install weasyprint
# ou se estiver usando conda:
conda install weasyprint
```

### Erro de fontes no PDF
O WeasyPrint pode ter problemas com fontes. Certifique-se de ter fontes básicas instaladas:
```bash
# Ubuntu/Debian
sudo apt-get install fonts-liberation

# macOS (via Homebrew)
brew install --cask font-liberation
```

### Problemas de permissão em diretórios
Certifique-se de que o usuário tem permissão para escrever nos diretórios `temp/` e `pdfs/`.

## 📝 Exemplo de Uso Completo

```javascript
// Exemplo usando fetch no JavaScript
const dadosOrcamento = {
  empresa: {
    nome: "Minha Empresa Ltda",
    endereco: "Rua Principal, 123",
    cidade: "São Paulo",
    estado: "SP",
    telefone: "(11) 3333-4444",
    email: "contato@minhaempresa.com"
  },
  cliente: {
    nome: "Cliente Exemplo",
    email: "cliente@email.com",
    telefone: "(11) 99999-9999"
  },
  itens: [
    {
      codigo: "SRV-001",
      descricao: "Desenvolvimento Web",
      detalhes: "Site responsivo com 5 páginas",
      quantidade: 1,
      unidade: "projeto",
      preco: 2500.00
    }
  ],
  desconto: 10,
  formaPagamento: "50% entrada + 50% entrega",
  observacoes: "Projeto inclui revisões ilimitadas"
};

// Gerar PDF
const response = await fetch('http://localhost:3000/orcamento/gerar/pdf', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(dadosOrcamento)
});

const pdfBlob = await response.blob();
// Use o pdfBlob como necessário
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `package.json` para detalhes.

## 🆘 Suporte

Para suporte, abra uma issue no repositório ou entre em contato através dos canais oficiais.

---

**Desenvolvido com ❤️ usando Node.js, React, Tailwind CSS e WeasyPrint**