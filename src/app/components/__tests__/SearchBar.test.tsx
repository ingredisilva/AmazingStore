import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBar from '../SearchBar';

describe('SearchBar', () => {
  it('renderiza o input corretamente', () => {
    render(<SearchBar value="" onChange={jest.fn()} />);

    // Checa se o input existe
    const inputElement = screen.getByPlaceholderText(/search/i);
    expect(inputElement).toBeInTheDocument();
  });

  it('Chama o onchange', () => {
    const handleChange = jest.fn();
    render(<SearchBar value="" onChange={handleChange} />);

    const inputElement = screen.getByPlaceholderText(/search/i);
    userEvent.type(inputElement, 'Teste');

    // Onchange deve chamar 5x ('T', 'e', 's', 't', 'e')
    expect(handleChange).toHaveBeenCalledTimes(5);

    expect(handleChange).toHaveBeenNthCalledWith(1, 'T');
    expect(handleChange).toHaveBeenNthCalledWith(2, 'Te');
    expect(handleChange).toHaveBeenNthCalledWith(3, 'Tes');
    expect(handleChange).toHaveBeenNthCalledWith(4, 'Test');
    expect(handleChange).toHaveBeenNthCalledWith(4, 'Teste');
  });
});
