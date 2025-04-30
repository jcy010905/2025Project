import { useState, useEffect } from 'react';
import Router from './router/Router';

function App() {
    const [token, setToken] = useState(localStorage.getItem('accessToken'));

    useEffect(() => {
        const syncToken = () => {
            setToken(localStorage.getItem('accessToken'));
        };
        window.addEventListener('storage', syncToken);

        return () => window.removeEventListener('storage', syncToken);
    }, []);

    useEffect(() => {
        if (!token) return;

        const expirationTime = getTokenExpiration(token);
        if (!expirationTime) return;

        const currentTime = Date.now();
        const timeout = expirationTime - currentTime;

        if (timeout > 0) {
            const timer = setTimeout(() => {
                localStorage.removeItem('accessToken');
                setToken(null);
            }, timeout);

            return () => clearTimeout(timer);
        } else {
            localStorage.removeItem('accessToken');
            setToken(null);
        }
    }, [token]);

    return <Router token={token} setToken={setToken} />;
}

function getTokenExpiration(token) {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.exp ? payload.exp * 1000 : null;
    } catch {
        return null;
    }
}

export default App;
