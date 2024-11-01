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
        });
    
        if (!response.ok) {
            throw new Error('Credenciales incorrectas');
        }
    
        return response.json();
    }
};

export default LoginService;