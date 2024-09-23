"use client";

import { RootState, useAppDispatch } from "@/lib/store";
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Image from "next/image";
import { addItem, removeItem } from "@/features/cartSlice"; // Import your actions

const Container = styled.div`
  max-width: 1280px;
  padding: 20px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #d1d5db;
`;

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: bold;
`;

const SubTitle = styled.h3`
  font-size: 1.25rem;
  color: #6b7280;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #e5e7eb;
  align-items: center;
`;

const ImageContainer = styled.div`
  max-width: 100px;
  margin-right: 20px;
`;

const ProductInfo = styled.div`
  flex: 1;
  h6 {
    font-size: 1rem;
    font-weight: bold;
  }
  p {
    color: #6b7280;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  button {
    padding: 10px;
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    cursor: pointer;
  }
  input {
    width: 40px;
    text-align: center;
    border: 1px solid #e5e7eb;
    margin: 0 5px;
  }
`;

const TotalPrice = styled.div`
  font-weight: bold;
  font-size: 1.125rem;
`;

const CheckoutButton = styled.button`
  background-color: #4f46e5;
  color: white;
  padding: 15px;
  width: 100%;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
`;

const CartPage: React.FC = () => {
  const { items, totalQuantity, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useAppDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem({ ...item, quantity: 1 })); // Add one more item
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item.id)); // Remove one item
  };

  return (
    <Container>
      <Header>
        <Title>Shopping Cart</Title>
        <SubTitle>{totalQuantity} Items</SubTitle>
      </Header>

      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {items.map((item) => (
            <CartItem key={item.id}>
              <ImageContainer>
                <Image src={item.image} alt={item.title} width={100} height={100} />
              </ImageContainer>
              <ProductInfo>
                <h6>{item.title}</h6>
                <p>${item.price.toFixed(2)}</p>
              </ProductInfo>
              <QuantityControl>
                <button onClick={() => handleRemoveItem(item)}>-</button>
                <input type="text" value={item.quantity} readOnly />
                <button onClick={() => handleAddItem(item)}>+</button>
              </QuantityControl>
              <TotalPrice>
                ${(item.price * item.quantity).toFixed(2)}
              </TotalPrice>
            </CartItem>
          ))}
          <CheckoutButton>Checkout</CheckoutButton>
        </>
      )}
    </Container>
  );
};

export default CartPage;
