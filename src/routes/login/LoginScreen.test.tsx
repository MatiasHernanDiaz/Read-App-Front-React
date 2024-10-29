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