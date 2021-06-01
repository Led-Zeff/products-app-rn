import { UserOverview } from './user';

export interface ProductsResponse {
  total: number;
  productos: Product[];
}

export interface Product {
  _id: string;
  nombre: string;
  precio: number;
  categoria: Category;
  usuario: UserOverview;
  img?: string;
}

export interface Category {
  _id: string;
  nombre: string;
}
