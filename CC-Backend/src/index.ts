// Importamos express y path
import express, { Request, Response } from "express";
import path from "path";
import empleadosRouter from "./routes/employees.routes";
import typeEmployeesRouter from "./routes/employees.routes";
/*import dotenv from "dotenv";
dotenv.config();*/

// Creamos la aplicación Express
const app = express();

// Definimos el puerto del servidor
const PORT = 3000;

// Middleware para interpretar JSON
app.use(express.json());

// Middleware para servir archivos estáticos
// __dirname representa la carpeta actual compilada
app.use(express.static(path.join(__dirname, "..", "public")));

//Employees
app.use("/api/employees", empleadosRouter);
app.get("api/employees/:id", empleadosRouter);
app.post("api/employees", empleadosRouter);
app.put("/api/employees", empleadosRouter);
app.delete("/api/employees/:id", empleadosRouter);

//TypeEmployees
app.use("/api/typeEmployees", typeEmployeesRouter);
app.get("api/typeEmployees/:id", typeEmployeesRouter);
app.post("api/typeEmployees", typeEmployeesRouter);
app.put("/api/typeEmployees", typeEmployeesRouter);
app.delete("/api/typeEmployees/:id", typeEmployeesRouter);

// Endpoint de prueba API
app.get("/api/saludo", (_req: Request, res: Response) => {
  res.json({ mensaje: "Hola desde la API 🚀" });
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
