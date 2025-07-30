import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LanguageFilter } from './LanguageFilter';

describe('LanguageFilter Component', () => {
  const mockOnLanguageChange = vi.fn();
  const mockOnClearAll = vi.fn();
  const availableLanguages = ['JavaScript', 'TypeScript', 'Python', 'Java'];

  it('should render language filter with available languages', () => {
    render(
      <LanguageFilter
        selectedLanguages={[]}
        availableLanguages={availableLanguages}
        onLanguageChange={mockOnLanguageChange}
        onClearAll={mockOnClearAll}
      />
    );
    
    const languageSelect = screen.getByLabelText('Language');
    expect(languageSelect).toBeInTheDocument();
  });

  it('should show selected languages as chips', () => {
    render(
      <LanguageFilter
        selectedLanguages={['JavaScript', 'Python']}
        availableLanguages={availableLanguages}
        onLanguageChange={mockOnLanguageChange}
        onClearAll={mockOnClearAll}
      />
    );
    
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  it('should show clear all button when languages are selected', () => {
    render(
      <LanguageFilter
        selectedLanguages={['JavaScript']}
        availableLanguages={availableLanguages}
        onLanguageChange={mockOnLanguageChange}
        onClearAll={mockOnClearAll}
      />
    );
    
    const clearButton = screen.getByText('Clear All');
    expect(clearButton).toBeInTheDocument();
  });

  it('should not show clear all button when no languages are selected', () => {
    render(
      <LanguageFilter
        selectedLanguages={[]}
        availableLanguages={availableLanguages}
        onLanguageChange={mockOnLanguageChange}
        onClearAll={mockOnClearAll}
      />
    );
    
    const clearButton = screen.queryByText('Clear All');
    expect(clearButton).not.toBeInTheDocument();
  });

  it('should call onClearAll when clear button is clicked', () => {
    render(
      <LanguageFilter
        selectedLanguages={['JavaScript']}
        availableLanguages={availableLanguages}
        onLanguageChange={mockOnLanguageChange}
        onClearAll={mockOnClearAll}
      />
    );
    
    const clearButton = screen.getByText('Clear All');
    fireEvent.click(clearButton);
    
    expect(mockOnClearAll).toHaveBeenCalled();
  });
}); 