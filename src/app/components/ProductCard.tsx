"use client";

import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
import { Produto } from "@/lib/types";
import { truncateText } from "@/lib/truncateText";
import { useAppDispatch } from "@/lib/store";
import { addItem } from "@/features/cartSlice";
import { useState } from "react";
import Loader from "./Loader";

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
/*  align-items: center;*/
  text-align: center; 
  transition: transform 0.2s ease-in-out;
  text-decoration: none;
  color: inherit;
  width: 100%;
  max-width: 400px;
  
  &:hover {
    transform: translateY(-5px);
  }

  .image-container {
    width: 250px;
    height: 250px;
    position: relative;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  img {
    border-radius: 10px;
    object-fit: cover;
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
    margin-top: 10px;
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
  max-width: 200px;

  &:hover {
    background-color: #333b4b;
  }
`;

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const shortDescription = truncateText(product.description, 100);
  const [loading, setLoading] = useState(true);

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(addItem({
      id: product.id, title: product.title, price: product.price, quantity: 1,
      image: product.image
    }));
  };

  return (

    <Card>
      <>
        <Link href={`/produtos/${product.id}`} passHref>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
            <div className="image-container">
              {loading && <Loader />}
              <Image
                src={product.image}
                alt={product.title}
                layout="fill"
                objectFit="cover"
                onLoadingComplete={() => setLoading(false)}
              />            </div>
            <h2>{product.title}</h2>
            <p className="desc">{shortDescription}</p>
          </div>
        </Link>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div >
            <p className="price" >${product.price.toFixed(2)}</p>
          </div>
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </div>
      </>
    </Card >
  );
}
