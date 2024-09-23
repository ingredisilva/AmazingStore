import { Produto } from "./types";

const BASE_URL = "https://fakestoreapi.in/api/products";

interface QueryParams {
  [key: string]: string | number;
}

interface ProductByIdResponse {
  status: string;
  message: string;
  product: Produto;
}

interface ApiResponse<T> {
  status: string;
  message: string;
  products: T[];
}

export async function getProdutos<T extends Produto>(
  path: string = "",
  params: QueryParams = {}
): Promise<Produto[]> {
  try {
    const url = new URL(`${BASE_URL}${path}`);
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, String(params[key]))
    );

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Falha ao buscar dados: ${response.statusText}`);
    }

    const data: ApiResponse<T> = await response.json();

    return data.products;
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw error;
  }
}

// Buscar produtos por página
export async function getProductsByPage(page: number): Promise<Produto[]> {
  const products = await getProdutos<Produto>("", { page });
  return products;
}

// Buscar um produto por ID
export async function getProductById(id: number): Promise<Produto> {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Falha ao buscar o produto");
    }

    const data: ProductByIdResponse = await response.json();

    return data.product;
  } catch (error) {
    console.error("Erro ao buscar produto por id:", error);
    throw error;
  }
}

// Buscar produtos por categoria e tipo
export async function getProductsByCategoryTypeAndSort(
  type: string,
  sort: string
): Promise<Produto[]> {
  const products = await getProdutos<Produto>("/category", { type, sort });
  return products;
}
