import styled from 'styled-components';
import ProductCard from './ProductCard';
import { Produto } from '@/lib/types';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

interface StoreFrontProps {
  products: Produto[];
}

export default function StoreFront({ products }: StoreFrontProps) {
  return (
    <Grid>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Grid>
  );
}
