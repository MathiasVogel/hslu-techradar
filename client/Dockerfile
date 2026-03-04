# STAGE 1: Build
FROM node:22-alpine AS build
WORKDIR /app

# Kopiere package.json UND die nun aktualisierte package-lock.json
COPY package*.json ./

# Falls npm ci immer noch zickt, stelle sicher, dass npm im Container aktuell ist
RUN npm install -g npm@11.6.2 && npm ci

COPY . .
RUN npm run build

# STAGE 2: Serve (Nginx)
FROM nginx:alpine AS final

COPY --from=build /app/dist/client/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
