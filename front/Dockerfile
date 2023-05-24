FROM node AS builder

WORKDIR /app

COPY *.json ./
RUN npm install

COPY src ./src
COPY public ./public
RUN npm run build

FROM nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/mime.types /conf/mime.types
COPY --from=builder /app/build /static
