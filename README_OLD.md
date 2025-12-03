# API de Geração de Orçamentos

Uma API Express simples que gera orçamentos usando React SSR (Server-Side Rendering) e Tailwind CSS v4.

## 🚀 Funcionalidades

- ✅ Geração de orçamentos em HTML com React SSR
- ✅ Estilização com Tailwind CSS v4
- ✅ Validação de dados de entrada
- ✅ Cálculo automático de impostos e totais
- ✅ Formatação de moeda brasileira (BRL)
- ✅ Layout responsivo e profissional
- ✅ Endpoints RESTful

## 📦 Instalação

```bash
# Clonar o repositório
git clone <seu-repositorio>
cd orcamento-api

# Instalar dependências
npm install

# Iniciar o servidor
npm start

# Ou modo de desenvolvimento (com nodemon)
npm run dev
```

## 🛠 Uso da API

### Endpoints Disponíveis

| Endpoint | Método | Descrição |
|----------|--------|-----------|
| `/` | GET | Documentação da API |
| `/orcamento/exemplo` | GET | Gerar orçamento de exemplo |
| `/orcamento/gerar` | POST | Gerar orçamento personalizado (HTML) |
| `/orcamento/dados` | POST | Gerar orçamento personalizado (JSON) |

### Exemplo de Uso

#### 1. Orçamento de Exemplo
```bash
curl http://localhost:3000/orcamento/exemplo
```

#### 2. Orçamento Personalizado (HTML)
```bash
curl -X POST http://localhost:3000/orcamento/gerar \
  -H "Content-Type: application/json" \
  -d '{
    "cliente": {
      "nome": "Maria Silva",
      "email": "maria@exemplo.com",
      "telefone": "(11) 98765-4321",
      "empresa": "Silva & Associados"
    },
    "itens": [
      {
        "descricao": "Consultoria em TI",
        "quantidade": 10,
        "preco": 150.00
      },
      {
        "descricao": "Desenvolvimento de Sistema",
        "quantidade": 1,
        "preco": 5000.00
      }
    ],
    "observacoes": "Pagamento em 3x sem juros",
    "validade": 45
  }'
```

#### 3. Orçamento Personalizado (JSON)
```bash
curl -X POST http://localhost:3000/orcamento/dados \
  -H "Content-Type: application/json" \
  -d '{
    "cliente": {
      "nome": "João Santos",
      "email": "joao@exemplo.com",
      "telefone": "(11) 99999-8888"
    },
    "itens": [
      {
        "descricao": "Website Institucional",
        "quantidade": 1,
        "preco": 2500.00
      }
    ]
  }'
```

## 📋 Estrutura dos Dados

### Dados de Entrada

```json
{
  "numeroOrcamento": 123456, // Opcional - gerado automaticamente se não fornecido
  "dataOrcamento": "2024-01-15T10:00:00Z", // Opcional - data atual se não fornecido
  "cliente": {
    "nome": "Nome do Cliente", // Obrigatório
    "email": "email@exemplo.com", // Obrigatório
    "telefone": "(11) 99999-9999", // Opcional
    "empresa": "Empresa Ltda" // Opcional
  },
  "itens": [ // Obrigatório - pelo menos 1 item
    {
      "descricao": "Descrição do produto/serviço", // Obrigatório
      "quantidade": 1, // Obrigatório - maior que 0
      "preco": 100.00 // Obrigatório - maior que 0
    }
  ],
  "observacoes": "Observações adicionais", // Opcional
  "validade": 30 // Opcional - padrão: 30 dias
}
```

### Dados de Saída (JSON)

```json
{
  "numeroOrcamento": 123456,
  "dataOrcamento": "2024-01-15T10:00:00Z",
  "cliente": { ... },
  "itens": [ ... ],
  "observacoes": "...",
  "validade": 30,
  "resumo": {
    "subtotal": 2500.00,
    "imposto": 450.00,
    "total": 2950.00,
    "totalFormatado": "R$ 2.950,00"
  }
}
```

## 🎨 Características do Layout

- **Design Responsivo**: Funciona em desktop e mobile
- **Cores Profissionais**: Paleta azul e cinza
- **Tipografia Clara**: Sistema de fontes legível
- **Tabela Organizada**: Itens bem estruturados
- **Cálculos Automáticos**: Subtotal, impostos (18%) e total
- **Formatação Brasileira**: Moeda em Real (BRL) e datas

## 🔧 Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web
- **React**: Biblioteca para interfaces
- **React DOM Server**: Renderização server-side
- **Tailwind CSS v4**: Framework CSS
- **Babel**: Transpilação JSX

## 📂 Estrutura do Projeto

```
orcamento-api/
├── components/
│   └── OrcamentoComponent.js    # Componente React do orçamento
├── utils/
│   └── ssr.js                   # Utilitários de renderização SSR
├── index.js                     # Servidor Express principal
├── package.json                 # Dependências e scripts
├── .babelrc                     # Configuração Babel
├── tailwind.config.js           # Configuração Tailwind
├── styles.css                   # Estilos base Tailwind
└── README.md                    # Este arquivo
```

## 🚨 Tratamento de Erros

A API inclui validação completa e tratamento de erros:

- **400 Bad Request**: Dados inválidos ou campos obrigatórios ausentes
- **404 Not Found**: Endpoint não encontrado
- **500 Internal Server Error**: Erros internos do servidor

Exemplo de resposta de erro:
```json
{
  "error": "Dados inválidos",
  "erros": [
    "Nome do cliente é obrigatório",
    "Email do cliente é obrigatório"
  ]
}
```

## 📝 Licença

ISC License

---

**Desenvolvido com ❤️ usando Node.js, React e Tailwind CSS**