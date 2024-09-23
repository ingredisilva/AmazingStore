"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "@/lib/store";
import { FiShoppingCart } from "react-icons/fi";
import Image from "next/image";
import { truncateText } from "@/lib/truncateText";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #fff8e8;
  border-bottom: 1px solid #e0e0e0;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
`;

const CartIconContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
`;

const CartCount = styled.span`
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 4px 8px;
  font-size: 12px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  z-index: 50;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  width: 350px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 90vh;
  overflow-y: auto;
  margin-right: 20px;
  margin-top: 20px;
  position: relative;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const CartItemsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CartItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;

  .image-container {
    margin-right: 10px;
    flex-shrink: 0;
    border-radius: 8px;
    overflow: hidden;
  }

  strong {
    margin-right: 10px;
    flex-grow: 1;
  }
`;

const FinishButton = styled.button`
  background-color: #2f3645;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;

  &:hover {
    background-color: #005bb5;
  }
`;

const CartModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { items, totalQuantity } = useSelector(
    (state: RootState) => state.cart
  );

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>Your Cart</h2>
        {totalQuantity === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <CartItemsList>
            {items.map((item) => (
              <CartItem key={item.id}>
                <div className="image-container">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={50}
                    height={50}
                  />
                </div>
                <strong>{truncateText(item.title, 10)}</strong>
                <strong>
                  {item.quantity} x ${item.price.toFixed(2)}
                </strong>
              </CartItem>
            ))}
          </CartItemsList>
        )}
        <Link href="/cart" passHref>
          <FinishButton>Go to Cart</FinishButton>
        </Link>
      </ModalContent>
    </ModalOverlay>
  );
};

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const totalItems = useSelector(
    (state: RootState) => state.cart.totalQuantity
  );

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <HeaderContainer>
        <Logo>
          <Link href="/">AWESOMEStore</Link>
        </Logo>
        <CartIconContainer onClick={handleOpenModal}>
          <FiShoppingCart style={{ width: "24px", height: "24px" }} />
          {totalItems > 0 && <CartCount>{totalItems}</CartCount>}
        </CartIconContainer>
      </HeaderContainer>

      {isModalOpen && <CartModal onClose={handleCloseModal} />}
    </>
  );
};

export default Header;
