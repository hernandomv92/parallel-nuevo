# --- Usamos Node 20 (LTS) para mejor compatibilidad con Tailwind ---
FROM node:20-slim

# Instalamos herramientas de compilación necesarias para módulos nativos
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiamos solo los manifiestos
COPY package.json ./
COPY extensions/sample/package.json ./extensions/sample/

# Limpiamos caché de npm y forzamos instalación limpia para Linux
RUN npm cache clean --force
RUN npm install --include=optional --no-package-lock

# Copiamos el resto del código (ignora node_modules por el .dockerignore)
COPY . .

# Compilamos la extensión
WORKDIR /app/extensions/sample
RUN npm run tsc

# Volvemos al root y construimos EverShop
WORKDIR /app
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "run", "start"]
