import React, { createContext, useEffect, useState } from 'react';
import kaffeeApi from '../api/kaffeeApi';
import { Product, ProductsResponse } from '../model/product';

type ProductsContextProps = {
  products: Product[];
  loadProducts: () => Promise<void>;
  addProduct: (name: string, categoryId: string) => Promise<void>;
  updateProduct: (
    id: string,
    name: string,
    categoryId: string,
  ) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  loadProduct: (id: string) => Promise<Product>;
  uploadImage: (data: string, id: string) => Promise<void>;
};

export const ProductsContext = createContext({} as ProductsContextProps);

export const ProductsProvider = ({ children }: any) => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    const { data } = await kaffeeApi.get<ProductsResponse>(
      '/productos?limite=10',
    );
    setProducts(data.productos);
  };

  const loadProduct = async (id: string) => {
    const { data } = await kaffeeApi.get<Product>(`/productos/${id}`);
    return data;
  };

  const addProduct = async (name: string, categoryId: string) => {
    const { data } = await kaffeeApi.post<Product>('/productos', {
      nombre: name,
      categoria: categoryId,
    });
    setProducts([...products, data]);
  };

  const updateProduct = async (
    id: string,
    name: string,
    categoryId: string,
  ) => {
    const { data } = await kaffeeApi.put<Product>(`/productos/${id}`, {
      nombre: name,
      categoria: categoryId,
    });
    setProducts([...products.filter(p => p._id !== id), data]);
  };

  const deleteProduct = async (id: string) => {};
  const uploadImage = async (data: string, id: string) => {};

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products,
        loadProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        loadProduct,
        uploadImage,
      }}>
      {children}
    </ProductsContext.Provider>
  );
};
