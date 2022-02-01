FROM mongo:3.6.8

RUN mkdir -p /database

WORKDIR /database

COPY 01-products.json .

# Change Permissions for json file
RUN chmod +x 01-products.json

WORKDIR /docker-entrypoint-initdb.d

COPY import.sh .

# Change Permissions for script
RUN chmod +x import.sh

# Fix end trailing character
RUN cat import.sh | tr -d '\r' > import.fix.sh && mv -v  import.fix.sh import.sh

CMD [ "bash", "/docker-entrypoint-initdb.d/import.sh", "mongo" ]

EXPOSE 27017