import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryFilter from '../CategoryFilter';

// categorias para o teste
const categories = ['Eletrônicos', 'Livros', 'Roupas'];

describe('CategoryFilter', () => {
  it('renderiza todas as categorias', () => {
    const handleChange = jest.fn();
    const selectedCategories: string[] = [];

    // Renderiza o componente CategoryFilter
    render(
      <CategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        onChange={handleChange}
      />
    );

    // Garante que as categorias são renderizadas como checkboxes
    categories.forEach((category) => {
      expect(screen.getByLabelText(category)).toBeInTheDocument();
    });
  });

  it('chama onChange quando uma categoria é selecionada', () => {
    const handleChange = jest.fn();
    const selectedCategories: string[] = [];

    // Renderiza CategoryFilter
    render(
      <CategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        onChange={handleChange}
      />
    );

    const electronicsCheckbox = screen.getByLabelText('Eletrônicos');

    // Simula a seleção da checkbox 'Eletrônicos'
    userEvent.click(electronicsCheckbox);

    // Garante que onChange foi chamado com os argumentos certos
    expect(handleChange).toHaveBeenCalledWith('Eletrônicos', true);
  });

  it('chama onChange quando uma categoria é desmarcada', () => {
    const handleChange = jest.fn();
    const selectedCategories = ['Livros'];

    // Renderiza o componente CategoryFilter com 'Livros' já selecionado
    render(
      <CategoryFilter
        categories={categories}
        selectedCategories={selectedCategories}
        onChange={handleChange}
      />
    );

    const booksCheckbox = screen.getByLabelText('Livros');

    // Garante que a checkbox 'Livros' está marcada
    expect(booksCheckbox).toBeChecked();

    // Simula a desmarcação da checkbox 'Livros'
    userEvent.click(booksCheckbox);

    // Garante que onChange foi chamado com os argumentos corretos (categoria desmarcada)
    expect(handleChange).toHaveBeenCalledWith('Livros', false);
  });
});
