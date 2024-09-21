// app/Produtos/[id]/page.tsx
import { getProductById } from '@/lib/getProdutos';
import { notFound } from 'next/navigation';
import Image from 'next/image';

interface ProductDetailPageProps {
  params: {
    id: string;
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = params;

  const product = await getProductById(Number(id));
  console.log(product)
  if (!product) {
    return notFound();
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <Image
        src={product.image}
        alt={product.title}
        width={300}
        height={300}
      />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Category: {product.category}</p>
    </div>
  );
}
