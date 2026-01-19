GET /api/empleado
curl -X GET http://localhost:3000/api/empleado

GET /api/empleado/:id (ejemplo con ID 1)
curl -X GET http://localhost:3000/api/empleado/1

POST /api/empleado
curl -X POST http://localhost:3000/api/empleado \
 -H "Content-Type: application/json" \
 -d '{"name": "Empleado ejemplo"}'

PUT /api/empleado
curl -X PUT http://localhost:3000/api/empleado \
 -H "Content-Type: application/json" \
 -d '{"name": "Empelado actualizado"}'

DELETE /api/empleado/:id (ejemplo con ID 1)
curl -X DELETE http://localhost:3000/api/empleado/1
