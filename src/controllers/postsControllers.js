import {
  getTodosPosts,
  criarPost,
  atualizarPost,
} from "../models/postModel.js";
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiService.js";

// Importa as funções para obter todos os posts e criar um novo post do modelo de dados
// Importa o módulo fs para realizar operações com o sistema de arquivos

export async function listarPosts(req, res) {
  // Chama a função para obter todos os posts do banco de dados
  const posts = await getTodosPosts();
  // Envia os posts como resposta em formato JSON com status 200 (OK)
  res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
  // Obtém os dados do novo post enviados no corpo da requisição
  const novoPost = req.body;
  try {
    // Chama a função para criar um novo post no banco de dados
    const postCriado = await criarPost(novoPost);
    // Envia o post criado como resposta em formato JSON com status 200 (OK)
    res.status(200).json(postCriado);
  } catch (erro) {
    // Captura e loga qualquer erro que ocorra durante a criação do post
    console.error(erro.message);
    // Envia uma resposta com status 500 (Internal Server Error) e uma mensagem de erro genérica
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

export async function uploadImagem(req, res) {
  // Cria um objeto com os dados básicos do novo post (assumindo que a imagem já foi enviada)
  const novoPost = {
    descricao: "",
    imgUrl: req.file.originalname, // Utiliza o nome original do arquivo como URL da imagem
    alt: "",
  };
  try {
    // Cria o novo post no banco de dados, obtendo o ID do post criado
    const postCriado = await criarPost(novoPost);
    // Constrói o novo nome do arquivo, utilizando o ID do post para garantir unicidade
    const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
    // Renomeia o arquivo para o novo nome, movendo-o para a pasta de uploads com o ID do post
    fs.renameSync(req.file.path, imagemAtualizada);
    // Envia o post criado como resposta em formato JSON com status 200 (OK)
    res.status(200).json(postCriado);
  } catch (erro) {
    // Captura e loga qualquer erro que ocorra durante o processo de upload e criação do post
    console.error(erro.message);
    // Envia uma resposta com status 500 (Internal Server Error) e uma mensagem de erro genérica
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}

export async function atualizarNovoPost(req, res) {
  const id = req.params.id;
  const urlImagem = `http://localhost:3000/${id}.png`;

  try {
    const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
    const descricao = await gerarDescricaoComGemini(imgBuffer);

    const post = {
      imgUrl: urlImagem,
      descricao: descricao,
      alt: req.body.alt,
    };

    const postCriado = await atualizarPost(id, post);
    res.status(200).json(postCriado);
  } catch (erro) {
    console.error(erro.message);
    res.status(500).json({ Erro: "Falha na requisição" });
  }
}
