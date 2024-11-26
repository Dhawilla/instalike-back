import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

// Importa a função `conectarAoBanco` do arquivo `dbConfig.js`
// Essa função é responsável por estabelecer a conexão com o banco de dados

// Conecta ao banco de dados utilizando a string de conexão fornecida como variável de ambiente
// A string de conexão contém informações como o nome do servidor, banco de dados, usuário e senha
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts do banco de dados
export async function getTodosPosts() {
  // Seleciona o banco de dados "imersao-instabytes" dentro da conexão estabelecida
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts" dentro do banco de dados selecionado
  const colecao = db.collection("posts");
  // Realiza uma consulta para encontrar todos os documentos (posts) na coleção
  // O método `toArray()` converte o cursor de resultados em um array de objetos
  return colecao.find().toArray();
}

export async function criarPost(novoPost) {
  // Seleciona o banco de dados "imersao-instabytes"
  const db = conexao.db("imersao-instabytes");
  // Seleciona a coleção "posts"
  const colecao = db.collection("posts");
  // Insere um novo documento (post) na coleção
  // O método `insertOne()` retorna um objeto com informações sobre a operação de inserção,
  // incluindo o ID do documento inserido
  return colecao.insertOne(novoPost);
}

export async function atualizarPost(id, novoPost) {
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");
  const objID = ObjectId.createFromHexString(id);
  return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: novoPost });
}
