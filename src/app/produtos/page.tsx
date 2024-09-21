"use client";
import { useEffect, useState } from 'react';
import { getProdutos } from '../../lib/getProdutos';
import { Produto } from '@/lib/types';
import StoreFront from '@/components/StoreFront';

export default function SideStore() {
  const [products, setProducts] = useState<Produto[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProdutos();
      setProducts(data);
    };

    loadProducts();
  }, []);

  return (
    <div className="container">
      <h1>SideStore</h1>
      <StoreFront products={products} />
    </div>
  );
}
