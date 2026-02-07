# EMPLEADO

# Obtener todos los empleados

curl -X GET http://localhost:3000/api/empleado

# Onbtener un empleado or id

curl -X GET http://localhost:3000/api/empleado/1

# Crear un empleado

curl -X POST http://localhost:3000/api/empleado \
 -H "Content-Type: application/json" \
 -d '{"name": "Empleado ejemplo"}'

# Editar los datos de un empleado

curl -X PUT http://localhost:3000/api/empleado \
 -H "Content-Type: application/json" \
 -d '{"name": "Empelado actualizado"}'

# Eliminar un empleado

curl -X DELETE http://localhost:3000/api/empleado/1

# TIPO DE EMPLEADO

# GET /api/tipoEmepleado

curl -X GET http://localhost:3000/api/typeEmployees

# Obtener tipo de empleado por id

curl -X GET http://localhost:3000/api/typeEmployees/1

# Crear tipo de empleado

curl -X POST http://localhost:3000/api/typeEmployees \
 -H "Content-Type: application/json" \
 -d '{"NombreTipo":"SECRETARIO"}'

# Editar tipo de empleado

curl -X PUT http://localhost:3000/api/typeEmployees/4 \
 -H "Content-Type: application/json" \
 -d '{"NombreTipo":"ADMINISTRATIVO"}'

# Eliminar tipo de empleado

curl -X DELETE http://localhost:3000/api/typeEmployees/4
