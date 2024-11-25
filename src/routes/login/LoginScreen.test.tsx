import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { cleanup, render, RenderResult } from "@testing-library/react"
import LoginScreen from "./LoginScreen"


describe( "LoginScreen", () => {

    vi.mock( import('react-router-dom'), ( importOriginal ) => {
        
        const mod = importOriginal()
        return { 
            ...mod, 
            Form: vi.fn(({ children }) => <form>{children}</form>)
        }
    })

    vi.mock( import( 'react'), async ( importOriginal ) => {
        const mod = await importOriginal()

        return { 
            ...mod, 
            useContext: vi.fn( () => [
                null, () => true
            ]) 
        }
    })

    let renderResult: RenderResult

    beforeEach( () => {
        cleanup()
        renderResult = render( <LoginScreen /> )
    })

    afterEach( () => {
        vi.clearAllMocks()
    })

    test( "Renderiza el componente", () => {
    
        expect( renderResult ).toBeTruthy()
    })
})