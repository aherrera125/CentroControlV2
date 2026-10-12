import "dotenv/config";
import express from "express";
import path from "path";
import membersRoutes from "./routes/members.routes";
import usersRoutes from "./routes/users.routes";
import typeMemberRoutes from "./routes/typeMember.routes";
import payRoutes from "./routes/pay.routes";
import authRoutes from "./routes/auth.routes";

// Creamos la aplicación Express
const app = express();

// Middleware para servir archivos estáticos - para servidor de frontend
const frontendPath = path.join(__dirname, "../../frontend/dist");
app.use(express.static(frontendPath));

// Definimos el puerto del servidor
const PORT = 3000;

// Middleware para interpretar JSON
app.use(express.json());

//Endpoint de registro y login
app.use("/auth", authRoutes);

//Endpoints de la API
app.use("/api/users", usersRoutes);
app.use("/api/typeMember", typeMemberRoutes);
app.use("/api/members", membersRoutes);
app.use("/api/pay", payRoutes);

app.use((_req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

/*app.get("/api/saludo", (_req: Request, res: Response) => {
  res.json({ mensaje: "Hola desde la API 🚀" });
});*/

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
