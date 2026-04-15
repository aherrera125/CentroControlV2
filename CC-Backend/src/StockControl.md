# EMPLEADO

# Obtener todos los empleados

curl -X GET http://localhost:3000/api/employees

# Onbtener un empleado or id

curl -X GET http://localhost:3000/api/employees/1

# Crear un empleado

curl -X POST http://localhost:3000/api/employees \
 -H "Content-Type: application/json" \
 -d '{
"apynom": "Juan Pérez",
"dni": 12345678,
"domicilio": "Calle Principal 123",
"fechaNac": "1980-05-15",
"telefonoCelular": "1123456789",
"telefonoFijo": "1187654321",
"typeEmployeeId": 1
}'

# Editar los datos de un empleado

curl -X PUT http://localhost:3000/api/employees/1 \
 -H "Content-Type: application/json" \
 -d '{
"apynom": "Juan Carlos Pérez",
"dni": 12345678,
"domicilio": "Calle Nueva 456",
"fechaNac": "1980-05-15",
"telefonoCelular": "1123456789",
"telefonoFijo": "1187654321",
"typeEmployeeId": 2
}'

# Eliminar un empleado

curl -X DELETE http://localhost:3000/api/employees/1

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
