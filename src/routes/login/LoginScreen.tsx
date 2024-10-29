
import { Form, redirect } from "react-router-dom";


export async function action () {
    await fetch(
        'http://localhost:9000/auth/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: "marge@simps.com",
                password: "mandarina"
            }),
            credentials: 'include',
            mode: 'cors'
        }
    )

    return redirect('/app')
}

export default function LoginScreen() {
    
    return (
        <>
            <h1>Login</h1>
            <Form method='post'>
                <button 
                    type="submit"
                >Loguearse</button>
            </Form>
        </>
    )
}