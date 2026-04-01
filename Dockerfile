# --- Usamos Node 18 Slim (Basado en Debian, mucho más compatible) ---
FROM node:18-slim
# Instalamos solo lo mínimo necesario de sistema
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    gcc \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
# Copiamos archivos de dependencias
COPY package*.json ./
COPY extensions/sample/package*.json ./extensions/sample/
# Instalamos todo (npm install en Debian suele ser más estable para nativos)
RUN npm install
# Copiamos el código fuente
COPY . .
# Paso 1: Compilar la extensión
WORKDIR /app/extensions/sample
RUN npm run tsc
# Paso 2: Construir EverShop (Esta vez el build DEBE terminar sin errores)
WORKDIR /app
RUN npm run build
# Configuramos el entorno de producción
ENV NODE_ENV=production
EXPOSE 3000
# Arrancamos la tienda
CMD ["npm", "run", "start"]