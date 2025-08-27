import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LanguageFilter } from './LanguageFilter';

describe('LanguageFilter Component', () => {
  const mockOnLanguageChange = vi.fn();

  it('should render language filter with available languages', () => {
    render(
      <LanguageFilter
        selectedLanguage=""
        onLanguageChange={mockOnLanguageChange}
      />
    );
    
    const languageSelect = screen.getByRole('combobox');
    expect(languageSelect).toBeInTheDocument();
  });

  it('should show "All Languages" as default option', () => {
    render(
      <LanguageFilter
        selectedLanguage=""
        onLanguageChange={mockOnLanguageChange}
      />
    );
    
    // Open the select dropdown
    const languageSelect = screen.getByRole('combobox');
    fireEvent.mouseDown(languageSelect);
    
    // Check if "All Languages" is in the document
    expect(screen.getByText('All Languages')).toBeInTheDocument();
  });

  it('should show clear button when a language is selected', () => {
    render(
      <LanguageFilter
        selectedLanguage="JavaScript"
        onLanguageChange={mockOnLanguageChange}
      />
    );
    
    const clearButton = screen.getByText('Clear');
    expect(clearButton).toBeInTheDocument();
  });

  it('should not show clear button when no language is selected', () => {
    render(
      <LanguageFilter
        selectedLanguage=""
        onLanguageChange={mockOnLanguageChange}
      />
    );
    
    const clearButton = screen.queryByText('Clear');
    expect(clearButton).not.toBeInTheDocument();
  });

  it('should call onLanguageChange when language is selected', () => {
    render(
      <LanguageFilter
        selectedLanguage=""
        onLanguageChange={mockOnLanguageChange}
      />
    );
    
    const languageSelect = screen.getByRole('combobox');
    fireEvent.mouseDown(languageSelect);
    
    const option = screen.getByText('JavaScript');
    fireEvent.click(option);
    
    expect(mockOnLanguageChange).toHaveBeenCalledWith('JavaScript');
  });

  it('should call onLanguageChange with empty string when clear is clicked', () => {
    render(
      <LanguageFilter
        selectedLanguage="JavaScript"
        onLanguageChange={mockOnLanguageChange}
      />
    );
    
    const clearButton = screen.getByText('Clear');
    fireEvent.click(clearButton);
    
    expect(mockOnLanguageChange).toHaveBeenCalledWith('');
  });
}); 