import OpenAI from "openai";

const apiKey = import.meta.env.VITE_CHAT_GPT_API as string;

const openai = new OpenAI({
  apiKey,
  // timeout: 20 * 1000,
  // dangerouslyAllowBrowser: true,
});

export default openai;

export async function getEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });

  const embeddiing = response.data[0].embedding;

  if (!embeddiing) {
    throw new Error("No embedding");
  }

  console.log("Embedding", embeddiing);

  return embeddiing;
}

export async function getEmbeddingsForProduct(productName: string) {
  return getEmbedding(productName ?? "");
}
