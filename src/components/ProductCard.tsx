import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { Produto } from '@/lib/types';
import { truncateText } from '@/lib/truncateText';

interface ProductCardProps {
  product: Produto;
}

const Card = styled.a`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(93, 93, 93, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  width: 100%;
  height: 500px; 
  max-width: 400px;

  &:hover {
    transform: translateY(-5px);
  }

  .image-container {
    width: 250px;
    height: 250px;
    position: relative;
    margin-bottom: 10px;
  }

  img {
    border-radius: 10px;
  }

  h2 {
    font-size: 14px;
/*     margin-bottom: 10px;
 */    color: #2F3645;
    text-align: left;
/*     height: 40px; 
 */    overflow: hidden; 
    text-overflow: ellipsis; 
  }

  p.price {
    font-size: 20px;
    color: #2F3645;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: left;
  }
  p.desc {
    font-size: 12px;
    color: #2F3645;
/*     font-weight: bold;
 */    text-align: left;
  }
`;

export default function ProductCard({ product }: ProductCardProps) {
  const shortDescription = truncateText(product.description, 100);
  return (
    <Link href={`/produtos/${product.id}`} passHref>
      <Card>
        <div className="image-container">
          <Image
            src={product.image}
            alt={product.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <h2>{product.title}</h2>
        <p className="desc">{shortDescription}</p>
        <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
          {/* <div className="stars">⭐⭐⭐⭐⭐</div> */}
          <p className="price">${product.price.toFixed(2)}</p>
        </div>
      </Card>
    </Link>
  );
}
