FROM node:20-bullseye-slim AS node-deps

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force


FROM python:3.11-slim-bullseye AS runtime

ENV NODE_ENV=production \
    PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PORT=8080

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    gnupg \
    libcairo2 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libgdk-pixbuf2.0-0 \
    libjpeg62-turbo \
    libopenjp2-7 \
    libtiff5 \
    libwebp6 \
    zlib1g \
    shared-mime-info \
    fonts-dejavu-core \
    fonts-liberation2 \
    && rm -rf /var/lib/apt/lists/* \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get update && apt-get install -y --no-install-recommends nodejs \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt ./
RUN pip install --no-cache-dir --upgrade pip setuptools wheel \
    && pip install --no-cache-dir -r requirements.txt

COPY --from=node-deps /app/node_modules ./node_modules
COPY . .

RUN useradd --create-home --uid 10001 appuser && chown -R appuser:appuser /app

USER appuser

EXPOSE 8080

CMD ["node_modules/.bin/babel-node", "src/index.js"]
