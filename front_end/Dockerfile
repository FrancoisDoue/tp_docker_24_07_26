FROM node AS node_builder

WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM httpd

RUN rm -rf /usr/local/apache2/htdocs/*
COPY --from=node_builder /usr/src/app/dist /usr/local/apache2/htdocs
EXPOSE 80
