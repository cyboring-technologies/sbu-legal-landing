# ETAPA 1: BUILDER
# Usamos una imagen Node.js con alpine para un tamaño reducido
FROM node:20-alpine@sha256:2d07db07a2df6830718ae2a47db6fedce6745f5bcd174c398f2acdda90a11c03 AS builder

# Set up workspace with proper structure
WORKDIR /workspace/frontend

# Install shared UI kit dependencies first
COPY shared/ui-kit/package*.json ./shared/ui-kit/
WORKDIR /workspace/frontend/shared/ui-kit
RUN npm install

# Copy rest of shared UI kit and build it
WORKDIR /workspace/frontend
COPY shared/ui-kit ./shared/ui-kit
WORKDIR /workspace/frontend/shared/ui-kit
RUN npm run build

# Set up corporate-web directory
WORKDIR /workspace/frontend/corporate-web

# Copia los archivos de configuración de corporate-web
# Copia el package.json y package-lock.json
COPY corporate-web/package.json corporate-web/package-lock.json ./
COPY corporate-web/next.config.js ./
COPY corporate-web/tailwind.config.ts ./
COPY corporate-web/postcss.config.js ./
COPY corporate-web/tsconfig.json ./

# 2. Instala las dependencias
# 'npm ci' es más rápido y asegura que los locks sean respetados.
RUN npm ci

# 4. Copia el resto del código fuente (componentes, etc.)
COPY corporate-web/ ./

# 5. Ejecuta la compilación de Next.js
# Generará la carpeta .next con server-side rendering habilitado
RUN npx next build

# ----------------------------------------------------------------------

# ETAPA 2: RUNNER (Servidor estático para export)
# Usamos una imagen ligera con serve para servir archivos estáticos
FROM node:20-alpine AS runner

WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy the exported static files
COPY --from=builder /workspace/frontend/corporate-web/out ./out

# Expose port 3000
EXPOSE 3000

# Serve the static files
CMD ["serve", "out", "-l", "3000"]
