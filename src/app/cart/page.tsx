"use client";

import { RootState } from "@/lib/store";
import React from "react";
import { useSelector } from "react-redux";
import PageLayout from "../components/PageLayout";
import styled from "styled-components";
import Image from "next/image";

const Section = styled.section`
  position: relative;
  z-index: 10;
  &::after {
    content: "";
    position: absolute;
    z-index: 0;
    height: 100%;
    width: 33%;
    top: 0;
    right: 0;
    background-color: #f9fafb;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  padding: 0 1rem;
  margin: 0 auto;
  position: relative;
  z-index: 10;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

const Column = styled.div<{ span: number }>`
  grid-column: span ${({ span }) => span} / span ${({ span }) => span};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 3.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #d1d5db;
`;

const Title = styled.h2`
  font-weight: 700;
  font-size: 1.875rem;
  line-height: 2.5rem;
  color: #000;
`;

const SubTitle = styled.h2`
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 2rem;
  color: #6b7280;
`;

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
`;

const ImageContainer = styled.div`
  width: 100%;
  max-width: 126px;
  margin-right: 1rem;
  img {
    border-radius: 0.75rem;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  h6 {
    font-weight: 600;
    font-size: 1rem;
    color: #000;
  }
  p {
    font-size: 1rem;
    color: #6b7280;
  }
`;

const Price = styled.h6`
  font-weight: 500;
  font-size: 1rem;
  color: #6b7280;
  &:hover {
    color: #4f46e5;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  transition: all 0.5s;
  &:hover {
    background-color: #f9fafb;
    border-color: #d1d5db;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  svg {
    stroke: #374151;
    transition: all 0.5s;
  }
`;

const QuantityInput = styled.input`
  border: 1px solid #e5e7eb;
  text-align: center;
  width: 60px;
  font-weight: 600;
  padding: 1rem;
`;

const TotalPrice = styled.p`
  font-weight: 700;
  font-size: 1.125rem;
  text-align: center;
  color: #4f46e5;
  &:hover {
    color: #4f46e5;
  }
`;

const Summary = styled.div`
  background-color: #f9fafb;
  padding: 3rem;
  h2 {
    font-weight: 700;
    font-size: 1.875rem;
    color: #000;
    padding-bottom: 2rem;
    border-bottom: 1px solid #d1d5db;
  }
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 0;
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 2rem;
  font-weight: 700;
  font-size: 1.5rem;
  color: #4f46e5;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: #4f46e5;
  color: white;
  font-weight: 600;
  text-align: center;
  border-radius: 0.75rem;
  transition: all 0.5s;
  &:hover {
    background-color: #4338ca;
  }
`;

const CartPage: React.FC = () => {
  const { items, totalQuantity, totalPrice } = useSelector(
    (state: RootState) => state.cart
  );

  return (
    <PageLayout>
      <Section>
        <Container>
          <Grid>
            <Column span={8}>
              <Header>
                <Title>Shopping Cart</Title>
                <SubTitle>{totalQuantity} Items</SubTitle>
              </Header>
              {items.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                items.map((item) => (
                  <FlexRow key={item.id}>
                    <ImageContainer>
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={100}
                        height={100}
                      />
                    </ImageContainer>
                    <ProductInfo>
                      <h6>{item.title}</h6>
                      <Price>${item.price.toFixed(2)}</Price>
                    </ProductInfo>
                    <QuantityControl>
                      <QuantityButton>-</QuantityButton>
                      <QuantityInput
                        type="text"
                        value={item.quantity}
                        readOnly
                      />
                      <QuantityButton>+</QuantityButton>
                    </QuantityControl>
                    <TotalPrice>
                      ${(item.price * item.quantity).toFixed(2)}
                    </TotalPrice>
                  </FlexRow>
                ))
              )}
            </Column>
            <Column span={4}>
              <Summary>
                <h2>Order Summary</h2>
                <SummaryRow>
                  <p>{totalQuantity} Items</p>
                  <p>${totalPrice.toFixed(2)}</p>
                </SummaryRow>
                <SummaryTotal>
                  <p>Total</p>
                  <p>${totalPrice.toFixed(2)}</p>
                </SummaryTotal>
                <CheckoutButton>Checkout</CheckoutButton>
              </Summary>
            </Column>
          </Grid>
        </Container>
      </Section>
    </PageLayout>
  );
};

export default CartPage;
