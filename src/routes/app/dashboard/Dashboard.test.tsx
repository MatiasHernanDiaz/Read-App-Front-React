import { render } from "@testing-library/react"
import { describe, it } from "vitest"
import Dashboard from "./Dashboard"

describe('Dashboard', () => {
    it('Chuando se renderiza',() => {
        
        render(<Dashboard/>)
    })
})