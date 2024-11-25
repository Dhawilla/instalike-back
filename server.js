import express from "express";
import routes from "./src/routes/postsRoutes.js";
// Importa o módulo Express para criar o servidor web
// Importa a função conectarAoBanco para estabelecer a conexão com o banco de dados
const app = express();
// Cria uma instância do Express para iniciar o servidor
app.use(express.static("uploads"));
routes(app);
// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("servidor escutando...");
});
