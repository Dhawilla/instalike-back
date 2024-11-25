import express from "express";
import multer from "multer";
import {
  listarPosts,
  postarNovoPost,
  uploadImagem,
  atualizarNovoPost,
} from "../controllers/postsControllers.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200,
};

// Importa o módulo Express para criar o servidor web
// Importa o módulo Multer para lidar com uploads de arquivos

// Importa as funções controladoras do arquivo postsControllers.js
//   - listarPosts: recupera a lista de posts
//   - postarNovoPost: cria um novo post
//   - uploadImagem: processa o upload de imagem

// Configura o armazenamento para arquivos enviados
const storage = multer.diskStorage({
  // Define o diretório de destino para os uploads (pasta 'uploads/')
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  // Define o nome do arquivo utilizando o nome original fornecido pelo cliente
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// Cria uma instância do middleware Multer utilizando a configuração de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Função para configurar as rotas da aplicação (recebe a instância do app Express)
const routes = (app) => {
  // Habilita o parsing de JSON no corpo das requisições
  app.use(express.json());
  app.use(cors(corsOptions));

  // Rota GET para listar todos os posts (tratada pela função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (tratada pela função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (usa o middleware upload.single('imagem') e chama a função uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
};

// Exporta a função routes para uso em outros módulos
export default routes;
