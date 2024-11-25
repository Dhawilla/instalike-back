import { MongoClient } from "mongodb";

// Importa a classe MongoClient do módulo MongoDB para criar uma conexão com o banco de dados.

export default async function conectarAoBanco(stringConexao) {
  let mongoClient;

  // Declara uma variável para armazenar a instância do cliente MongoDB.
  // Essa variável será inicializada dentro do bloco try...catch.

  try {
    // Cria uma nova instância do cliente MongoDB, passando a string de conexão como argumento.
    mongoClient = new MongoClient(stringConexao);
    // Exibe uma mensagem no console para indicar que a conexão está sendo estabelecida.
    console.log("Conectando ao cluster do banco de dados...");
    // Tenta estabelecer a conexão com o banco de dados. Essa é uma operação assíncrona, por isso utilizamos await.
    await mongoClient.connect();
    // Se a conexão for estabelecida com sucesso, exibe uma mensagem de confirmação.
    console.log("Conectado ao MongoDB Atlas com sucesso!");

    // Retorna a instância do cliente MongoDB para que possa ser utilizada em outras partes do código.
    return mongoClient;
  } catch (erro) {
    // Captura qualquer erro que possa ocorrer durante o processo de conexão.
    // Exibe a mensagem de erro no console para facilitar a depuração.
    console.error("Falha na conexão com o banco!", erro);
    // Encerra a execução da aplicação caso ocorra algum erro crítico na conexão.
    process.exit();
  }
}
