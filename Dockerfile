# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Instalar Python e dependências do WeasyPrint
RUN apk add --no-cache \
    python3 \
    py3-pip \
    gcc \
    musl-dev \
    python3-dev \
    cairo-dev \
    jpeg-dev \
    openjpeg-dev \
    zlib-dev

# Copiar package files
COPY package*.json ./

# Instalar dependências Node
RUN npm ci --only=production && \
    npm ci --only=development

# Instalar dependências Python (usar --break-system-packages é seguro em Docker)
RUN pip install --no-cache-dir --break-system-packages weasyprint

# Copiar código-fonte
COPY . .

# Runtime stage
FROM node:18-alpine

WORKDIR /app

# Instalar Python runtime e dependências do WeasyPrint (sem ferramentas de build)
RUN apk add --no-cache \
    python3 \
    py3-pip \
    cairo \
    cairo-gobject \
    fontconfig \
    freetype \
    glib \
    gobject-introspection \
    jpeg \
    libffi \
    openjpeg \
    pango \
    ttf-dejavu \
    zlib

# Copiar do builder: node_modules, arquivo de dependências e código
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app . 

# Instalar apenas WeasyPrint no runtime (usa wheels do builder)
RUN pip install --no-cache-dir --break-system-packages weasyprint

# Criar diretório para PDFs
RUN mkdir -p /app/pdfs /app/temp

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Expor porta
EXPOSE 3000

# Executar aplicação
CMD ["npm", "start"]
