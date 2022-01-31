
export interface Product {
  id: number;
  brand: string;
  description: string;
  image: string;
  price: number;
}

export interface SearchData {
  totalPages: number;
  page: number;
}

export interface ProductsResponse {
  msg: string;
  data: Product[];
  extra: SearchData;
}