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

    return <Router token={token} setToken={setToken} />;
}

export default App;
