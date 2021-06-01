import { useEffect, useState } from 'react';
import kaffeeApi from '../api/kaffeeApi';
import { Category } from '../model/product';

export const useCategories = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    kaffeeApi
      .get<any>('/categorias')
      .then(data => setCategories(data.data.categorias))
      .finally(() => setIsLoading(false));
  }, []);

  return { categories, isLoading };
};
