import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import AlertDialog, { propsBtnDelete } from './BtnDelete';

// Mock para la acción
const mockSetAction = vi.fn().mockResolvedValue(undefined);

const defaultProps: propsBtnDelete = {
  title: 'Confirmar eliminación',
  btnTitle: 'Eliminar',
  description: '¿Estás seguro de que deseas eliminar este elemento?',
  setAction: mockSetAction,
};

describe('AlertDialog Component', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('debería abrir el diálogo al hacer clic en el botón', () => {
    render(<AlertDialog {...defaultProps} />);

    // Verifica que el diálogo no esté visible inicialmente
    expect(screen.queryByRole('dialog')).toBeNull();

    // Clic en el botón principal
    fireEvent.click(screen.getByRole('button', { name: /Eliminar/i }));

    // Verifica que el diálogo se haya abierto
    const dialog = screen.getByRole('dialog');
    expect(dialog).not.toBeNull();
    expect(screen.getByText(/Confirmar eliminación/i)).not.toBeNull();
    expect(screen.getByText(/¿Estás seguro de que deseas eliminar este elemento?/i)).not.toBeNull();
    cleanup()
  });
  
  it('debería ejecutar la acción al confirmar y cerrar el diálogo', async () => {
    cleanup()
    render(<AlertDialog {...defaultProps} />);

    // Abrir el diálogo
    fireEvent.click(screen.getByRole('button', { name: /Eliminar/i }));

    // Clic en el botón "Aceptar"
    fireEvent.click(screen.getByRole('button', { name: /Aceptar/i }));

    // Verifica que la acción se haya ejecutado
    expect(mockSetAction).toHaveBeenCalledTimes(1);
    
  });
});
