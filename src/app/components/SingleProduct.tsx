"use client";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addItem } from "@/features/cartSlice";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface SingleProductProps {
  product: Product;
}

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
`;

const ProductTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #2f3645;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  color: #6b7280;
`;

const ProductPrice = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #2f3645;
`;

const ImageContainer = styled.div`
  flex: 0 0 400px;
  @media (max-width: 768px) {
    flex: none;
    width: 100%;
  }
`;
const AddToCartButton = styled.button`
  background-color: #4f46e5; 
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  width: max-content;

  &:hover {
    background-color: #4338ca; 
  }
`;
const SingleProduct: React.FC<SingleProductProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1,
      })
    );
  };

  return (
    <CardContainer>
      <ImageContainer>
        <Image
          src={product.image}
          alt={product.title}
          width={400}
          height={300}
        />
      </ImageContainer>
      <ProductInfo>
        <ProductTitle>{product.title}</ProductTitle>
        <ProductDescription>{product.description}</ProductDescription>
        <ProductPrice>Price: ${product.price.toFixed(2)}</ProductPrice>
        <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>

      </ProductInfo>
    </CardContainer>
  );
};

export default SingleProduct;
