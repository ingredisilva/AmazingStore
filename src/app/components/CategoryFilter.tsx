import React from 'react';
import styled from 'styled-components';

interface CategoryFilterProps {
  categories: string[];
  selectedCategories: string[];
  onChange: (category: string, isChecked: boolean) => void;
}

const CategoryBox = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export default function CategoryFilter({
  categories,
  selectedCategories,
  onChange,
}: CategoryFilterProps) {
  return (
    <CategoryBox>
      {categories.map((category) => (
        <label key={category} style={{ display: 'flex', alignItems: 'center' }}>
          <input
            type="checkbox"
            checked={selectedCategories.includes(category)}
            onChange={(e) => onChange(category, e.target.checked)}
            style={{ marginRight: '6px' }}
          />
          {category}
        </label>
      ))}
    </CategoryBox>
  );
}
