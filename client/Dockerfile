# STAGE 1: Build
FROM node:22-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build # Erzeugt den dist/ Ordner

# STAGE 2: Serve (Nginx)
FROM nginx:alpine as final
# WICHTIG: Pfad an deinen Angular-Projektnamen anpassen!
COPY --from=build /app/dist/. /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
