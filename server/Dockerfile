FROM node:22

WORKDIR /app

# 1. Alles kopieren
COPY . .

# 2. Alles installieren (inkl. Prisma & TS)
RUN npm install

# 3. Prisma Client generieren
RUN npx prisma generate

# 4. TypeScript zu JavaScript umwandeln
RUN npm run build

# 5. Starten
EXPOSE 3000
CMD ["node", "dist/server.js"]