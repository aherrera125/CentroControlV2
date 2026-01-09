// Importamos Express y los tipos Request y Response desde express
// Esto nos permite tipar correctamente los parámetros de las rutas
import express, { Request, Response } from "express";

// Creamos la instancia principal de la aplicación Express
const app = express();

// Definimos el puerto donde va a escuchar el servidor
const PORT = 3000;

// Middleware que permite leer JSON en el body de las requests
app.use(express.json());

// Endpoint GET raíz
// URL: http://localhost:3000/
app.get("/", (req: Request, res: Response) => {
  // Respondemos con un objeto JSON simple
  res.json({ message: "Servidor funcionando 🚀" });
});

// Endpoint GET /saludo
// URL: http://localhost:3000/saludo
app.get("/saludo", (req: Request, res: Response) => {
  res.json({ saludo: "Hola desde Node.js + Express + TypeScript" });
});

// Iniciamos el servidor HTTP
// Si todo está correcto, veremos el mensaje en consola
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
