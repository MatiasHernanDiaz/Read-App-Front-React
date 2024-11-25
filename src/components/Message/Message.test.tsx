import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import Message from "./Message"
import { AxiosResponse } from "axios"


describe('Message', () => {
    it('Recibe un 200', () =>{
        const res = {status: 200, data:{message:"test 200"}} as AxiosResponse
        render(<Message res={res}/>)
        const alert = screen.getByTestId('alert')
        console.log(alert)
        expect(alert.classList.contains('MuiAlert-filledSuccess')).toBe("MuiAlert-filledSuccess");
    })
})