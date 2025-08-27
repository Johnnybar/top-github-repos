import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Search } from './Search';

describe('Search Component', () => {
  const mockOnSearch = vi.fn();

  it('should render search input with placeholder', () => {
    render(<Search onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText('Search repositories...');
    expect(searchInput).toBeInTheDocument();
  });

  it('should call onSearch when input changes', () => {
    render(<Search onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText('Search repositories...');
    fireEvent.change(searchInput, { target: { value: 'new search' } });
    
    expect(mockOnSearch).toHaveBeenCalledWith('new search');
  });

  it('should have empty initial value', () => {
    render(<Search onSearch={mockOnSearch} />);
    
    const searchInput = screen.getByPlaceholderText('Search repositories...');
    expect(searchInput).toHaveValue('');
  });
}); 