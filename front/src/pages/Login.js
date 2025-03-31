import { useState } from "react";
import "../css/Login.css";
import { loginApi } from "../api/LoginApi";
import { useNavigate } from "react-router-dom";
import RouterPath from "../router/RouterPath";

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        await loginApi(username, password);
        } catch (error) {
        // console.error('로그인 실패:', error);
        }
    };

    return (
        <div className="wrapper">
            <div className="login-wrapper">
                <h2>로그인</h2>
                <form id="login-form" onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="아이디"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <input type="submit" value="로그인" />
                    <button className="signup-button" onClick={() => navigate(RouterPath.signup)}>
                            회원가입
                    </button>
                </form>
            </div>
        </div>
    );
}
