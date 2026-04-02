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

# Configuramos la URL para el build
ENV URL=https://paralel.store

# Copiamos manifiestos
COPY package.json ./
COPY extensions/sample/package.json ./extensions/sample/

# Instalación limpia - Sin omitir devDependencies porque evershop build las necesita
RUN npm cache clean --force
RUN npm install --include=optional --no-package-lock

# Copiamos el resto del código
COPY . .

# Compilamos la extensión
WORKDIR /app/extensions/sample
RUN npm run tsc

# Volvemos al root y construimos EverShop
WORKDIR /app
RUN npm run build

# Ahora sí, configuramos a producción para el tiempo de ejecución
ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "run", "start"]
