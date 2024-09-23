import SideStore from '@/app/produtos/page';
import { getProdutos } from '@/lib/getProdutos';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

jest.mock('../../../lib/getProdutos');

// Dados para teste
const mockProducts = [
  {
    id: 1,
    title: 'Product A',
    category: 'Electronics',
    price: 100,
    description: 'A great product',
    image: '/product-a.jpg',
  },
  {
    id: 2,
    title: 'Product B',
    category: 'Books',
    price: 50,
    description: 'A great book',
    image: '/product-b.jpg',
  },
];

describe('SideStore Component', () => {
  beforeEach(() => {
    (getProdutos as jest.Mock).mockResolvedValue(mockProducts);
  });

  it('deve renderizar a lista de produtos corretamente', async () => {
    // Renderizar o componente
    render(<SideStore />);

    // Aguardar até que os produtos sejam carregados
    await waitFor(() => expect(screen.getByText('Product A')).toBeInTheDocument());
    expect(screen.getByText('Product B')).toBeInTheDocument();
  });

  it('deve filtrar os produtos com base no termo de busca', async () => {
    // Renderizar o componente
    render(<SideStore />);

    // Aguardar até que os produtos sejam carregados
    await waitFor(() => expect(screen.getByText('Product A')).toBeInTheDocument());

    // Encontrar o input de busca e simular uma busca por "Product B"
    const searchInput = screen.getByPlaceholderText(/search for a product/i);
    fireEvent.change(searchInput, { target: { value: 'Product B' } });

    // Verificar se o produto correto aparece e o outro some
    expect(screen.queryByText('Product A')).not.toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();
  });

  it('deve filtrar produtos com base na categoria selecionada', async () => {
    // Renderizar o componente
    render(<SideStore />);

    // Aguardar até que os produtos sejam carregados
    await waitFor(() => expect(screen.getByText('Product A')).toBeInTheDocument());

    // Selecionar a categoria "Books"
    const booksCheckbox = screen.getByLabelText('Books');
    fireEvent.click(booksCheckbox);

    // Verificar se apenas o produto da categoria "Books" aparece
    expect(screen.queryByText('Product A')).not.toBeInTheDocument();
    expect(screen.getByText('Product B')).toBeInTheDocument();
  });

  it('deve mostrar a mensagem de "Nenhum produto encontrado" quando não houver correspondências', async () => {
    // Renderizar o componente
    render(<SideStore />);

    // Aguardar até que os produtos sejam carregados
    await waitFor(() => expect(screen.getByText('Product A')).toBeInTheDocument());

    // Simular uma busca que não retorne resultados
    const searchInput = screen.getByPlaceholderText(/search for a product/i);
    fireEvent.change(searchInput, { target: { value: 'Non-existent product' } });

    // Verificar se a mensagem "No products found" é exibida
    expect(screen.getByText('No products found for Non-existent product.')).toBeInTheDocument();
  });
});
