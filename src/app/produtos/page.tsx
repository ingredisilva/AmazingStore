"use client";
import { useEffect, useState } from 'react';
import { getProdutos } from '../../lib/getProdutos';
import { Produto } from '@/lib/types';
import Link from 'next/link';

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
    <div>
      <h1>All Products</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <Link href={`/produtos/${product.id}`}>
              {product.title} - ${product.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
