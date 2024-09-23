"use client";
import { useEffect, useState } from "react";
import { getProdutos } from "../../lib/getProdutos";
import { Produto } from "@/lib/types";
import SearchBar from "@/app/components/SearchBar";
import CategoryFilter from "@/app/components/CategoryFilter";
import styled from "styled-components";
import ProductCard from "../components/ProductCard";
import SkeletonProductCard from "../components/SkeletonCard";
import Loader from "../components/Loader";

const Filters = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  `;

const Grid = styled.div`
    display: grid;
    height: 100%;
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
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await getProdutos();
      setProducts(data);
      setFilteredProducts(data);
      const uniqueCategories = Array.from(
        new Set(data.map((product) => product.category))
      );
      setCategories(uniqueCategories);
      setLoading(false);
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchQuery || selectedCategories.length > 0) {
      setSearching(true);

      filtered = products.filter((product) => {
        const matchesQuery = product.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesCategory =
          selectedCategories.length === 0 ||
          selectedCategories.includes(product.category);
        return matchesQuery && matchesCategory;
      });

      setTimeout(() => {
        setFilteredProducts(filtered);
        setSearching(false);
      }, 500);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, selectedCategories, products]);

  const handleCategoryChange = (category: string, isChecked: boolean) => {
    if (isChecked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };


  return (
    <div /* className="container" */ style={{ height: '100%' }}>
      <Filters>
        <h2>Amazing Products, Amazing Store</h2>
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

      {loading ? (
        <Grid>
          {[...Array(6)].map((_, index) => (
            <SkeletonProductCard key={index} />
          ))}
        </Grid>
      ) : searching ? (
        <Loader />
      ) : filteredProducts.length === 0 ? (
        <>
          <p>No products found for {searchQuery}.</p><Grid>
            {[...Array(6)].map((_, index) => (
              <SkeletonProductCard key={index} />
            ))}
          </Grid></>
      ) : (
        <Grid>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Grid>
      )}
    </div>
  );
}