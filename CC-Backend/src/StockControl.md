# API ENDPOINTS - Centro Control V2

## MEMBERS (SOCIOS)

### GET - Obtener todos los socios

```bash
curl -X GET http://localhost:3000/api/members
```

### POST - Crear un socio

```bash
curl -X POST http://localhost:3000/api/members \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "typeMemberId": 1,
    "memberNum": 1001,
    "benefitNum": "BEN001",
    "fullName": "Juan Carlos Pérez",
    "dni": "12345678",
    "dateOfBirth": "1980-05-15",
    "phone": "1123456789",
    "status": 1,
    "dateAdmission": "2024-01-15",
    "salary": 50000,
    "address": "Calle Principal 123"
  }'
```

### PUT - Actualizar datos de un socio

```bash
curl -X PUT http://localhost:3000/api/members \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "id": 1,
    "typeMemberId": 2,
    "memberNum": 1001,
    "benefitNum": "BEN001",
    "fullName": "Juan Carlos Pérez López",
    "dni": "12345678",
    "dateOfBirth": "1980-05-15",
    "phone": "1123456789",
    "status": 1,
    "dateAdmission": "2024-01-15",
    "salary": 55000,
    "address": "Calle Nueva 456"
  }'
```

### DELETE - Eliminar un socio

```bash
curl -X DELETE http://localhost:3000/api/members \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "id": 1
  }'
```

---

## USERS (USUARIOS)

### GET - Obtener todos los usuarios

```bash
curl -X GET http://localhost:3000/api/users
```

### POST - Crear un usuario

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "email": "juan@example.com",
    "password": "SecurePassword123!",
    "name": "Juan",
    "lastName": "Pérez",
    "status": true,
    "role": "admin"
  }'
```

### PUT - Actualizar datos del usuario autenticado

```bash
curl -X PUT http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "email": "juan.nuevo@example.com",
    "password": "NewSecurePassword456!",
    "name": "Juan Carlos",
    "lastName": "Pérez López",
    "status": true,
    "role": "user"
  }'
```

### DELETE - Eliminar usuario autenticado

```bash
curl -X DELETE http://localhost:3000/api/users \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## NOTAS IMPORTANTES

- Todos los endpoints que modifican datos (POST, PUT, DELETE) requieren autenticación con token Bearer
- El token debe incluirse en el header `Authorization: Bearer YOUR_TOKEN`
- Las fechas deben estar en formato ISO 8601: `YYYY-MM-DD`
- Los status de miembros: 1 = Activo, 0 = Inactivo
- Los roles de usuario: `admin` o `user`
- Para los endpoints PUT y DELETE de members, asegúrate de incluir el `id` en el body
