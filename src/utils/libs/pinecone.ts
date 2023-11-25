import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = import.meta.env.VITE_PINECONE_API as string;

const pinecone = new Pinecone({
  environment: "gcp-starter",
  apiKey,
});

export const dataIndex = pinecone.Index("online-mart-ai");
