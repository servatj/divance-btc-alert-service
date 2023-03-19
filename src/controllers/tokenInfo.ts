import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new Token_info
async function createTokenInfo(data: {
  symbol: string;
  logo_url: string;
  pair: string;
  networks: string;
  totalSupply: number;
  fixedSupply: boolean;
  api: string;
  token_exchange_query: string;
}) {
  const tokenInfo = await prisma.token_info.create({
    data,
  });
  return tokenInfo;
}

// Get all Token_info
async function getAllTokenInfo() {
  const tokenInfos = await prisma.token_info.findMany();
  return tokenInfos;
}

// Get a single Token_info by ID
async function getTokenInfoById(id: number) {
  const tokenInfo = await prisma.token_info.findFirst({
    where: {
      id,
    },
  });
  return tokenInfo;
}

// Update a Token_info by ID
async function updateTokenInfo(id: number, data: {
  symbol?: string;
  logo_url?: string;
  pair?: string;
  networks?: string;
  totalSupply?: number;
  fixedSupply?: boolean;
  api?: string;
  token_exchange_query?: string;
}) {
  const tokenInfo = await prisma.token_info.update({
    where: {
      id,
    },
    data,
  });
  return tokenInfo;
}

// Delete a Token_info by ID
async function deleteTokenInfo(id: number) {
  const tokenInfo = await prisma.token_info.delete({
    where: {
      id,
    },
  });
  return tokenInfo;
}

export default {
    createTokenInfo,
    getAllTokenInfo,
    getTokenInfoById,
    updateTokenInfo,
    deleteTokenInfo,
}
