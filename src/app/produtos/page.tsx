"use client";
import { useEffect, useState } from "react";
import { getProdutos } from "../../lib/getProdutos";
import { Produto } from "@/lib/types";
import SearchBar from "@/app/components/SearchBar";
import CategoryFilter from "@/app/components/CategoryFilter";
import styled from "styled-components";
import ProductCard from "../components/ProductCard";

const Filters = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  `;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  `;
export default function SideStore() {
  const [products, setProducts] = useState<Produto[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Produto[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProdutos();
      setProducts(data);
      setFilteredProducts(data);
      const uniqueCategories = Array.from(
        new Set(data.map((product) => product.category))
      );
      setCategories(uniqueCategories);
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    console.log('44')
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategories]);

  console.log(searchQuery)
  const handleCategoryChange = (category: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };



  return (
    <div /* className="container" */>
      <Filters>
        <h1>Our Products</h1>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search for a product..."
          />
          <CategoryFilter
            categories={categories}
            selectedCategories={selectedCategories}
            onChange={handleCategoryChange}
          />
        </div>
      </Filters>

      {filteredProducts.length === 0 ? (
        <p>No products found for {searchQuery}.</p>
      ) : (
        <Grid>
          {filteredProducts.map(
            (
              product
            ) => (
              <ProductCard key={product.id} product={product} />
            )
          )}
        </Grid>
      )}
    </div>
  );
}
