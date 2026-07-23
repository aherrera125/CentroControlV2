# API ENDPOINTS - Centro Control V2

## AUTH

### POST - Registrar usuario

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "SecurePassword123!",
    "name": "Admin",
    "lastName": "Ejemplo",
    "rolId": 1
  }'
```

- `rolId` debe corresponder al id de la tabla `ROLE`.
- La contraseña se guarda en la base de datos ya encriptada con bcrypt.

### POST - Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "SecurePassword123!"
  }'
```

- Devuelve información del usuario si las credenciales son correctas.
- Actualmente no se emite JWT en este endpoint.

---

## MEMBERS (SOCIOS)

### GET - Obtener todos los socios

```bash
curl -X GET http://localhost:3000/api/members
```

### POST - Crear un socio

```bash
curl -X POST http://localhost:3000/api/members \
  -H "Content-Type: application/json" \
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
curl -X PUT http://localhost:3000/api/members/1 \
  -H "Content-Type: application/json" \
  -d '{
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
curl -X DELETE http://localhost:3000/api/members/1
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
  -d '{
    "email": "juan@example.com",
    "password": "SecurePassword123!",
    "name": "Juan",
    "lastName": "Pérez",
    "status": true,
    "role": "user"
  }'
```

### PUT - Actualizar datos del usuario autenticado

```bash
curl -X PUT http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
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
curl -X DELETE http://localhost:3000/api/users
```

---

## TYPE MEMBER (TIPOS DE SOCIO)

### GET - Obtener todos los tipos de socio

```bash
curl -X GET http://localhost:3000/api/typeMember
```

### POST - Crear un tipo de socio

```bash
curl -X POST http://localhost:3000/api/typeMember \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Socio Premium"
  }'
```

### PUT - Actualizar un tipo de socio

```bash
curl -X PUT http://localhost:3000/api/typeMember/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Socio VIP"
  }'
```

### DELETE - Eliminar un tipo de socio

```bash
curl -X DELETE http://localhost:3000/api/typeMember/1
```

---

## PAY

### GET - Obtener todos los pagos

```bash
curl -X GET http://localhost:3000/api/pay
```

### POST - Crear un pago

```bash
curl -X POST http://localhost:3000/api/pay \
  -H "Content-Type: application/json" \
  -d '{
    "memberId": 1,
    "amount": 5000,
    "description": "Cuota mensual",
    "payDate": "2024-06-01",
    "status": "paid"
  }'
```

### PUT - Actualizar un pago

```bash
curl -X PUT http://localhost:3000/api/pay/1 \
  -H "Content-Type: application/json" \
  -d '{
    "memberId": 1,
    "amount": 5200,
    "description": "Cuota mensual actualizada",
    "payDate": "2024-06-01",
    "status": "paid"
  }'
```

### DELETE - Eliminar un pago

```bash
curl -X DELETE http://localhost:3000/api/pay/1
```

---

## NOTAS IMPORTANTES

- Todos los endpoints son públicos y no requieren token ni autenticación JWT.
- Las fechas deben estar en formato ISO 8601: `YYYY-MM-DD`.
- Los roles de usuario son `admin` y `user`.
- `status` para socios puede ser `1` o `0`.
- `rolId` en `POST /auth/register` debe existir en la tabla `ROLE`.
