# # Step 1: Use an official Nginx image to serve the static files
# FROM nginx:alpine

# # Step 2: Copy the built React app to the Nginx HTML directory
# COPY build/ /usr/share/nginx/html

# # Step 3: Copy custom Nginx config (optional, but good for routing)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Step 4: Expose port 80
# EXPOSE 80

# # Step 5: Start Nginx
# CMD ["nginx", "-g", "daemon off;"]

# Étape 1 : build de l'app React
FROM node:18 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Étape 2 : image NGINX pour servir le frontend
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
