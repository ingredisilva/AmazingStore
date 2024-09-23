"use client";
import { AnimatePresence, motion } from "framer-motion";
import router from "next/router";
import React from "react";
import styled from "styled-components";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  min-height: 100vh;
`;

const MainContent = styled.main`
/*   margin-top: 50px;
 */  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
`;

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #e0e0e0;
`;

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <PageContainer>
      {/*       <Header />
       */}{" "}
      <MainContent>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={router.route}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </MainContent>
      <FooterContainer>
        <p>© 2024 AWESOMEStore. All rights reserved.</p>
      </FooterContainer>
    </PageContainer>
  );
};

export default PageLayout;
