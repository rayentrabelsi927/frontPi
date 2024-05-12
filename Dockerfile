FROM node:20.11.1 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install -f

RUN npm install angularx-flatpickr@7.0.0 -f && npm install ngx-bootstrap@^10.3.0 -f

RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
COPY . .
# RUN npm run build

FROM nginx:stable
COPY default.conf /etc/nginx/conf.d
COPY --from=build /app/dist/testfront /usr/share/nginx/html
EXPOSE 80

