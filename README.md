# Wallmart Palindrome Challenge
Welcome! This project is my solution for the Wallmart Full Stack Developer "Palíndromo".

The project use the following tools:
- NodeJS
- MongoDB
- Docker

## Requisites
To run this app, you need to have the following tools:
- docker
- docker-compose
- git
- make (optional)

## Usage
You need follow the next steps to run this app

```bash
# ----------------------------
# 1. Clone this repository
# ----------------------------
git clone https://github.com/Martux1995/wallmart-challenge-palindromo.git

# ----------------------------
# 2. Move to the root app folder
# ----------------------------
cd wallmart-challenge-palindromo

# ----------------------------
# 3. Build and Run app
# ----------------------------
make init-service

# Alternative way to run
docker-compose up

# Alternative to run in background mode
make init-service-bg
# or
docker-compose up -d
```

## Backend API
This API REST server has this route

### Get Products

#### Endpoint
`GET http://localhost:4000/products`

#### Query Parameters:
- `q`: A `String` to filter products by brand or description, or a `Number` to get a product by it's ID. If the content is a `String`, this need to get at least 4 caracters.
- `page`: A `Number` to determinate the page to get. This field is optional and needs to be a number greater than 0. By default, it's value is `1`.
- `limit`: A `Number` to determinate the page size to get (amount of products). This field is optional and needs to be a number greater than 0 and less or equal than 100. By default, it's value is `12`.

#### Responses
In general, for any cases, a succesful search will return a `200` response code with this body on JSON format:

```json
{
    "msg": String,
    "data": {
      "_id": MongoDB ID,
      "id": Number,
      "brand": String,
      "description": String,
      "image": String,
      "price": Number
    }[]
}
```

For this response, if the query param `q` is a `number`, the `data` array will return one product inside the array with the same attributes. If the query param `q` is a `string`, the `data` array will return zero, one or many products depending on the match of the search.

If you search a product by ID (`q` query parameter as a `Number`) and this product not exists, the server will respond with a `404` status code and this JSON body:

```json
{
  "msg": String // This is the error description
}
```

For others errors case, server will response with a `404` status code. The detail error data will come in the next format depending of the errors cathed by the server:

```json
{
    "msg": string,
    "err": {
      "q": string | empty,
      "size": string | empty,
      "limit": string | empty
    }
}
```

## Execute unit tests
To run unit test, you need to execute the next command:
```bash
make run-tests

# Alternative way
docker-compose run --rm node npx jest
```

## Stop and Delete App
If you start the service in background mode, you need to execute this command to stop it.
```bash
make stop-service

# Alternative way
docker-compose stop
```

Finally, if you want to delete the containers and images, you need to execute this command.

```bash
make down-service

# Alternative way
docker-compose down
docker rmi $(docker images wallmart-challenge-palindromo* -q)
```