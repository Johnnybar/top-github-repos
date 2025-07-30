import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Search } from './Search';

describe('Search Component', () => {
  const mockOnSearchChange = vi.fn();

  it('should render search input with placeholder', () => {
    render(<Search searchTerm="" onSearchChange={mockOnSearchChange} />);
    
    const searchInput = screen.getByPlaceholderText('Search repositories...');
    expect(searchInput).toBeInTheDocument();
  });

  it('should display the current search term', () => {
    render(<Search searchTerm="test search" onSearchChange={mockOnSearchChange} />);
    
    const searchInput = screen.getByPlaceholderText('Search repositories...');
    expect(searchInput).toHaveValue('test search');
  });

  it('should call onSearchChange when input changes', () => {
    render(<Search searchTerm="" onSearchChange={mockOnSearchChange} />);
    
    const searchInput = screen.getByPlaceholderText('Search repositories...');
    fireEvent.change(searchInput, { target: { value: 'new search' } });
    
    expect(mockOnSearchChange).toHaveBeenCalledWith('new search');
  });
}); 