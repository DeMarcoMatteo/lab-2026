<<<<<<< Updated upstream
# Lab 03 - APIs with Express

This repository contains a proposed solution for the third laboratory of the courses. Specifically, this README includes an overview of the files contained in the `solution` folder and a description of each API offered by the server.

## File overview

- `server.js`: the main file of the server. It defines all the API endpoints and behavior. It interacts with the database and returns to the client the desired data.
- `db.js`: it opens the database. It has to be imported (e.g., by `dao-film.js`) to interact with the db.
- `dao-films.js`: it contains all the method for interacting with the database (specifically, to interact with the `film` table).
- `films.js`: the same data model for Film objects used in the previous labs.
- `test-api.http`: this file can be used for testing the API with a dedicated Visual Studio Code extension.

## List of APIs offered by the server

### Film Management

#### Get all films

HTTP method: `GET`  URL: `/api/films`

- Description: Get the full list of films or the films that match the query filter parameter
- Request body: _None_
- Request query parameter: _filter_ name of the filter to apply (filter-all, filter-favorite, filter-best, filter-lastmonth, filter-unseen)
- Response: `200 OK` (success)
- Response body: Array of objects, each describing one film:

  ``` json
  [
    {
      "id": 1,
      "title": "Pulp Fiction",
      "favorite": true,
      "watchDate": "2023-03-11",
      "rating": 5,
      "userId": 1
    },
    {
      "id": 2,
      "title": "21 Grams",
      "favorite": true,
      "watchDate": "2023-03-17",
      "rating": 4,
      "userId": 1
    },
    ...
  ]
  ```

- Error responses:  `500 Internal Server Error` (generic error)

#### Get film by id

HTTP method: `GET`  URL: `/api/films/:id`

- Description: Get the film corresponding to the id 
- Request body: _None_
- Response: `200 OK` (success)
- Response body: One object describing the required film:

  ``` JSON
  [
    {
      "id": 2,
      "title": "21 Grams",
      "favorite": true,
      "watchDate": "2023-03-17",
      "rating": 4,
      "userId": 1
    }
  ]
  ```

- Error responses:  `500 Internal Server Error` (generic error), `404 Not Found` (not present or unavailable)

#### Add a new film

HTTP method: `POST`  URL: `/api/films`

- Description: Add a new film to the films of a specified user
- Request body: description of the object to add

  ``` JSON
  {
      "title": "21 Grams",
      "favorite": true,
      "watchDate": "2023-03-17",
      "rating": 4,
      "userId": 1
  }
  ```

- Response: `200 OK` (success)
- Response body: the entire representation of the newly-added film

- Error responses: `404 Not Found` (not present or unavailable), `422 Unprocessable Entity` (invalid input), `503 Service Unavailable` (database error)

#### Update an existing film

HTTP method: `PUT`  URL: `/api/films/:id`

- Description: Update values of an existing film, except the id
- Request body: description of the object to update

  ``` JSON
  {
      "title": "The Matrix",
      "favorite": true,
      "watchDate": "2023-03-31",
      "rating": 5,
      "userId": 1
  }
  ```

- Response: `200 OK` (success)
- Response body: the entire representation of the newly-added film

- Error responses: `404 Not Found` (not present or unavailable), `422 Unprocessable Entity` (invalid input), `503 Service Unavailable` (database error)

#### Delete an existing film

HTTP method: `DELETE`  URL: `/api/films/:id`

- Description: Delete an existing film
- Request body: _None_

- Response: `200 OK` (success)
- Response body: _None_

- Error responses:  `404 Not Found` (not present or unavailable), `503 Service Unavailable` (database error)

#### Update whether a film is favorite

HTTP method: `PUT`  URL: `/api/films/:id/favorite`

- Description: Update favorite value of an existing film 
- Request body: value of the favorite property

  ``` JSON
  {
      "favorite": true,
  }
  ```

- Response: `200 OK` (success)
- Response body: the object as represented in the database

- Error responses: `404 Not Found` (not present or unavailable), `422 Unprocessable Entity` (invalid input), `503 Service Unavailable` (database error)

#### Update the rating of an existing film 

HTTP method: `PUT`  URL: `/api/films/:id/rating`

- Description: Update the rating of an existing film 
- Request body: value of the rating property

  ``` JSON
  {
      "rating": 5,
  }
  ```

- Response: `200 OK` (success)
- Response body: the object as represented in the database

- Error responses: `404 Not Found` (not present or unavailable), `422 Unprocessable Entity` (invalid input), `503 Service Unavailable` (database error)
=======
# Film Library API - Design

Questo documento descrive le API HTTP per il backend della Film Library.
Tutti i dati in request/response body sono in formato JSON.

## Base URL

http://localhost:3001/api

## Risorse

- Collection: /films
- Element: /films/{id}

## Entita Film (exchange entity)

```json
{
	"id": 1,
	"title": "Pulp Fiction",
	"favorite": true,
	"watchDate": "2026-03-10",
	"rating": 5,
	"userId": 1
}
```

Note campi:
- id: intero, generato dal server.
- title: stringa non vuota.
- favorite: boolean.
- watchDate: data in formato YYYY-MM-DD oppure null (film non visto).
- rating: intero tra 1 e 5 oppure null.
- userId: intero assegnato dal backend (es. 1).

---

[GET] /api/films?filter={filterName}
Recupera tutti i film oppure un sottoinsieme filtrato.
Parametri:
- query filter (opzionale): favorite | best | seenLastMonth | unseen

Sample request:
```http
GET /api/films HTTP/1.1
Host: localhost:3001
```

Sample request (con filtro):
```http
GET /api/films?filter=favorite HTTP/1.1
Host: localhost:3001
```

Sample response:
```http
HTTP/1.1 200 OK
Content-Type: application/json

[
	{
		"id": 1,
		"title": "Pulp Fiction",
		"favorite": true,
		"watchDate": "2026-03-10",
		"rating": 5,
		"userId": 1
	},
	{
		"id": 2,
		"title": "Inception",
		"favorite": false,
		"watchDate": null,
		"rating": null,
		"userId": 1
	}
]
```

Error response(s):
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{ "error": "Invalid filter value" }
```
```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{ "error": "Database error" }
```

---

[GET] /api/films/{id}
Recupera il film con l'id specificato.
Parametri:
- path id (obbligatorio): intero.

Sample request:
```http
GET /api/films/1 HTTP/1.1
Host: localhost:3001
```

Sample response:
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
	"id": 1,
	"title": "Pulp Fiction",
	"favorite": true,
	"watchDate": "2026-03-10",
	"rating": 5,
	"userId": 1
}
```

Error response(s):
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{ "error": "Invalid film id" }
```
```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{ "error": "Film not found" }
```
```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{ "error": "Database error" }
```

---

[POST] /api/films
Crea un nuovo film nella collection films.
Parametri:
- body (obbligatorio): title, favorite, watchDate, rating.
- id e userId non devono essere inviati dal client.

Sample request:
```http
POST /api/films HTTP/1.1
Host: localhost:3001
Content-Type: application/json

{
	"title": "The Matrix",
	"favorite": false,
	"watchDate": "2026-03-21",
	"rating": 5
}
```

Sample response:
```http
HTTP/1.1 201 Created
Content-Type: application/json
Location: /api/films/7

{
	"id": 7,
	"title": "The Matrix",
	"favorite": false,
	"watchDate": "2026-03-21",
	"rating": 5,
	"userId": 1
}
```

Error response(s):
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{ "error": "Invalid request body" }
```
```http
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/json

{ "error": "Validation failed" }
```
```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{ "error": "Database error" }
```

---

[PUT] /api/films/{id}
Aggiorna tutte le proprieta modificabili del film specificato.
Parametri:
- path id (obbligatorio): intero.
- body (obbligatorio): title, favorite, watchDate, rating.

Sample request:
```http
PUT /api/films/7 HTTP/1.1
Host: localhost:3001
Content-Type: application/json

{
	"title": "The Matrix Reloaded",
	"favorite": true,
	"watchDate": "2026-03-22",
	"rating": 4
}
```

Sample response:
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
	"id": 7,
	"title": "The Matrix Reloaded",
	"favorite": true,
	"watchDate": "2026-03-22",
	"rating": 4,
	"userId": 1
}
```

Error response(s):
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{ "error": "Invalid id or body" }
```
```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{ "error": "Film not found" }
```
```http
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/json

{ "error": "Validation failed" }
```

---

[PATCH] /api/films/{id}/rating
Aggiorna solo il rating del film specificato.
Parametri:
- path id (obbligatorio): intero.
- body (obbligatorio): rating.

Sample request:
```http
PATCH /api/films/7/rating HTTP/1.1
Host: localhost:3001
Content-Type: application/json

{ "rating": 5 }
```

Sample response:
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
	"id": 7,
	"title": "The Matrix Reloaded",
	"favorite": true,
	"watchDate": "2026-03-22",
	"rating": 5,
	"userId": 1
}
```

Error response(s):
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{ "error": "Invalid film id" }
```
```http
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/json

{ "error": "Rating must be an integer between 1 and 5" }
```
```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{ "error": "Film not found" }
```

---

[PATCH] /api/films/{id}/favorite
Imposta un film come preferito/non preferito.
Parametri:
- path id (obbligatorio): intero.
- body (obbligatorio): favorite (boolean).

Sample request:
```http
PATCH /api/films/7/favorite HTTP/1.1
Host: localhost:3001
Content-Type: application/json

{ "favorite": false }
```

Sample response:
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
	"id": 7,
	"title": "The Matrix Reloaded",
	"favorite": false,
	"watchDate": "2026-03-22",
	"rating": 5,
	"userId": 1
}
```

Error response(s):
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{ "error": "Invalid film id" }
```
```http
HTTP/1.1 422 Unprocessable Entity
Content-Type: application/json

{ "error": "favorite must be boolean" }
```
```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{ "error": "Film not found" }
```

---

[DELETE] /api/films/{id}
Elimina il film con l'id specificato.
Parametri:
- path id (obbligatorio): intero.

Sample request:
```http
DELETE /api/films/7 HTTP/1.1
Host: localhost:3001
```

Sample response:
```http
HTTP/1.1 204 No Content
```

Error response(s):
```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{ "error": "Invalid film id" }
```
```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{ "error": "Film not found" }
```
```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{ "error": "Database error" }
```

---

## Regole di validazione consigliate

- Gli id nei path parameter devono essere interi.
- rating deve essere un intero tra 1 e 5 (o null quando non assegnato).
- watchDate deve essere una data valida in formato YYYY-MM-DD (o null).
- title deve essere presente e non vuoto.
- favorite deve essere boolean.
>>>>>>> Stashed changes
