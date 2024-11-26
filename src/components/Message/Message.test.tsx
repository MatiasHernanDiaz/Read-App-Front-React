import { cleanup, render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Message from './Message'
import { AxiosResponse } from 'axios'

describe('Message Component', () => {
  it('muestra un mensaje de éxito cuando el status es 200', () => {
    const mockResponse = {
      status: 200,
      data: 'Operación exitosa',
    } as AxiosResponse

    render(<Message res={mockResponse} />)

    const alert = screen.getByTestId('alert')
    

    expect(alert.textContent).toBe('Operación exitosa')
    expect(alert.className).toBe('MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiAlert-root MuiAlert-colorSuccess MuiAlert-filledSuccess MuiAlert-filled css-dzmomi-MuiPaper-root-MuiAlert-root'); // Verifica que sea un mensaje de éxito
    cleanup()
})


  it('muestra un mensaje de error cuando el status es 500', () => {
    const mockResponse2 = {
      status: 500,
      data: { message: 'Error del servidor' },
    } as AxiosResponse;

    render(<Message res={mockResponse2} />)
    const alert = screen.getByTestId('alert')

    expect(alert.textContent).toBe('Error del servidor')
    expect(alert.className).toBe('MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation0 MuiAlert-root MuiAlert-colorError MuiAlert-filledError MuiAlert-filled css-wo8dwg-MuiPaper-root-MuiAlert-root'); // Verifica que sea un mensaje de error
    cleanup()
    })
})
