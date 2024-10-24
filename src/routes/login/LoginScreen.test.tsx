import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"
import { cleanup, render, RenderResult } from "@testing-library/react"
import LoginScreen from "./LoginScreen"


describe( "Root", () => {

    vi.mock( import( 'react'), ( importOriginal ) => {
        const mod = importOriginal()

        return { 
            ...mod, 
            createContext: vi.fn( () => ({
                userState: [ null, vi.fn() ]
            })),
            useContext: vi.fn( ( context: unknown ) => ({
                userState: [ null, vi.fn() ]
            })),
            useState: vi.fn( () => ([ null, vi.fn() ] ))
        }
    })
    
    vi.mock( import( '../root/Root'), ( importOriginal ) => {
        const mod = importOriginal()

        return { 
            ...mod, 
            sessionContext: vi.fn()
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