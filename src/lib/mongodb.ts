// lib/mongodb.ts

import { MongoClient, Db, ServerApiVersion } from "mongodb"; // Importa ServerApiVersion

// Verifique se a variável de ambiente MONGODB_URI está definida
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri: string = process.env.MONGODB_URI;
// Opções do cliente, incluindo ServerApiVersion para compatibilidade
const options = {
  appName: "FtbApp", // Nome da sua aplicação, útil para logs no Atlas
  serverApi: {
    version: ServerApiVersion.v1, // Usa a versão 1 da API do servidor
    strict: true, // Garante que operações não suportadas pela API v1 falhem
    deprecationErrors: true, // Emite erros para recursos depreciados
  },
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // Em modo de desenvolvimento, use uma variável global para que o valor
  // seja preservado entre os recarregamentos de módulo causados pelo HMR (Hot Module Replacement).
  const globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Em modo de produção, é melhor não usar uma variável global.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

/**
 * Função para obter a instância do cliente MongoDB conectado.
 * @returns Promise<MongoClient> Uma promessa que resolve para o cliente MongoDB conectado.
 */
export async function getMongoClient(): Promise<MongoClient> {
  return clientPromise;
}

/**
 * Função para obter a instância do banco de dados específico.
 * @param dbName O nome do banco de dados a ser acessado.
 * @returns Promise<Db> Uma promessa que resolve para a instância do banco de dados.
 */
export async function getDb(dbName: string): Promise<Db> {
  const connectedClient = await clientPromise;
  return connectedClient.db(dbName);
}

// Exporta o cliente para ser usado diretamente se necessário, mas getDb é mais comum
export default clientPromise;
