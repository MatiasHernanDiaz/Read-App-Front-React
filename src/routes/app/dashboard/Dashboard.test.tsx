import { cleanup, render, RenderResult, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import Dashboard from './Dashboard'


describe( "Dashboard", () => {

    vi.mock( import( 'react'), async ( importOriginal ) => {
        const mod = await importOriginal()

        return { 
            ...mod, 
            useContext: vi.fn( () => ({
                showMessage: () => console.log('showMessage called')
            })) 
        }
    })
    
    // vi.mock( import("../../../services/DashService"), async ( importOriginal ) => {
    //     const mod = await importOriginal()
    //     return { ...mod, getDataDash: vi.fn( () => new Promise( ( res ) => { res({
    //                 books: { amount: 50 },
    //                 readingCenter: { amount: 50 },
    //                 recoms: { amount: 50 },
    //                 users: { amount: 50 }
    //             })} ) )}
    // })
    vi.mock( import( 'axios'), async ( importOriginal ) => {
        const mod = await importOriginal()

        return { 
            ...mod, 
            get: vi.fn( ( url: string ) => new Promise( res => {
                res({
                    data: {
                        books: { amount: 50 },
                        readingCenter: { amount: 50 },
                        recoms: { amount: 50 },
                        users: { amount: 50 }
                    }
                })
            }))
        }
    })


    beforeEach( () => {
        cleanup()
        render( <Dashboard /> )
    })

    afterEach( () => {
        vi.clearAllMocks()
    })

    test( "Renderiza el componente y muestra los datos", async () => {
            
        const recomsData = await waitFor( () => screen.getByTestId( 'dash-data-Recomendaciones') )

        expect( recomsData ).toBeTruthy()
        expect( recomsData.textContent ).toBe( '50' )
    })

    
    // test( "Despliega filtros", async () => {

    //     const noFilters = screen.queryAllByTestId( 'filter' )

    //     expect( noFilters.length ).toBe( 0 )
    
    //     const showFilterButton = await screen.findByTestId( 'show-filter-button' )
        
    //     fireEvent.click( showFilterButton )

    //     const filters = screen.queryAllByTestId( 'filter' )

    //     expect( filters.length ).toBe( 6 )
    //     expect( filters ).toMatchSnapshot()
    // })
})