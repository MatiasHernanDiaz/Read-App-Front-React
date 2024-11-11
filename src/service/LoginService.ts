import axios from "axios";

const LoginService = {
    login:  async (email: string, password: string): Promise<Response> => {
        const response = await fetch('http://localhost:9000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
            mode: 'cors'

        })

    
        if (!response.ok) {
            throw new Error('Credenciales incorrectas');
        }
        return response.json();
    }

    getSignedUser: async () => {
        const res = await axios.get('http://localhost:9000/auth/login')

        return res.user
    }
};

export default LoginService;