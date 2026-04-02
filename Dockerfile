# --- Usamos Node 20 (LTS) ---
FROM node:20-slim

# Instalamos herramientas de compilación
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    gcc \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Configuramos variables de entorno para el momento de COMPILACIÓN (Build Time)
ENV NODE_ENV=production
ENV URL=https://paralel.store

# Copiamos manifiestos
COPY package.json ./
COPY extensions/sample/package.json ./extensions/sample/

# Instalación limpia
RUN npm cache clean --force
RUN npm install --include=optional --no-package-lock

# Copiamos el resto del código
COPY . .

# Compilamos la extensión
WORKDIR /app/extensions/sample
RUN npm run tsc

# Volvemos al root y construimos EverShop (Aquí es donde se graba la URL)
WORKDIR /app
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]
