"use client";
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    @media (max-width: 768px) {
      font-size: 14px; /* mobile */
    }
  }

  body {
    background-color: #FFF8E8; 
    color: #2F3645; 
    font-family: 'Inter', sans-serif;
    line-height: 1.5;
  }

  h1, h2, h3, h4, h5, h6 {
    color: #2F3645; /* headings */
    font-weight: 600;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 32px;
    @media (max-width: 768px) {
      font-size: 28px;
    }
  }

  h2 {
    font-size: 24px;
    @media (max-width: 768px) {
      font-size: 20px;
    }
  }

  p {
    font-size: 16px;
    @media (max-width: 768px) {
      font-size: 14px;
    }
    margin-bottom: 10px;
  }

  a {
    color: #AAB396; /* links */
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  button {
    font-family: 'Inter', sans-serif;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &.primary {
      background-color: #AAB396; 
      color: white;
    }

    &.secondary {
      background-color: #2F3645; 
      color: white;
    }

    &:hover {
      opacity: 0.9;
    }

    @media (max-width: 768px) {
      padding: 8px 12px;
    }
  }

  /* Container e Spacing */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    @media (max-width: 768px) {
      padding: 10px;
    }
  }

  .card {
    background-color: #F7EED3; 
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 10px;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export default GlobalStyle;
