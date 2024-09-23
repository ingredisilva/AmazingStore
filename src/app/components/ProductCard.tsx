"use client";

import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Produto } from "@/lib/types";
import { truncateText } from "@/lib/truncateText";
import { useAppDispatch } from "@/lib/store";
import { addItem } from "@/features/cartSlice";

interface ProductCardProps {
  product: Produto;
}

const Card = styled.div`
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
  text-decoration: none;
  color: inherit;
  width: 100%;
/*   height: 500px;
 */  
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
    color: #2f3645;
    text-align: left;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p.price {
    font-size: 20px;
    color: #2f3645;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: left;
  }

  p.desc {
    font-size: 12px;
    color: #2f3645;
    text-align: left;
  }
`;

const Button = styled.button`
  background-color: #2F3645;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  width: 100%;

  &:hover {
    background-color: #333b4b;
  }
`;

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const shortDescription = truncateText(product.description, 100);

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(addItem({
      id: product.id, title: product.title, price: product.price, quantity: 1,
      image: product.image
    }));
  };

  return (
    <Card>
      <Link href={`/produtos/${product.id}`} passHref>
        <div>
          <div className="image-container">
            <Image src={product.image} alt={product.title} layout="fill" objectFit="cover" />
          </div>
          <h2>{product.title}</h2>
          <p className="desc">{shortDescription}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <p className="price">${product.price.toFixed(2)}</p>
          </div>
        </div>
      </Link>
      <Button onClick={handleAddToCart}>Add to Cart</Button>
    </Card>
  );
}
