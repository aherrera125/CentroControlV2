"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
//import path from "path";
const members_routes_1 = __importDefault(require("./routes/members.routes"));
const users_routes_1 = __importDefault(require("./routes/users.routes"));
const typeMember_routes_1 = __importDefault(require("./routes/typeMember.routes"));
const pay_routes_1 = __importDefault(require("./routes/pay.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
//import typeEmployeesRoutes from "./routes/typeEmployees.routes";
// Creamos la aplicación Express
const app = (0, express_1.default)();
// Definimos el puerto del servidor
const PORT = 3000;
// Middleware para interpretar JSON
app.use(express_1.default.json());
// Middleware para servir archivos estáticos
// app.use(express.static(path.join(__dirname, "..", "public")));
//Endpoint de registro y login
app.use("/auth", auth_routes_1.default);
//Endpoints de la API
app.use("/api/users", users_routes_1.default);
app.use("/api/typeMember", typeMember_routes_1.default);
app.use("/api/members", members_routes_1.default);
app.use("/api/pay", pay_routes_1.default);
/*app.get("/api/saludo", (_req: Request, res: Response) => {
  res.json({ mensaje: "Hola desde la API 🚀" });
});*/
// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor activo en http://localhost:${PORT}`);
});
