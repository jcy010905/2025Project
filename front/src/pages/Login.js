import { useState } from "react";
import "../css/Login.css";
import { loginApi } from "../api/LoginApi";
import { useNavigate } from "react-router-dom";
import RouterPath from "../router/RouterPath";

export default function Login({ setToken }) {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        if (username === '') {
            alert("아이디를 입력하세요");
        } else if (password === '') {
            alert("비밀번호를 입력하세요");
        } else {
            try {
                await loginApi(username, password);
                const token = localStorage.getItem('accessToken');
                if (token) {
                    setToken(token); // 상태 갱신 → Router 재렌더링됨
                    navigate(RouterPath.slash);
                } else {
                    alert("아이디 또는 비밀번호가 틀렸습니다");
                }
            } catch (error) {
                alert("아이디 또는 비밀번호가 틀렸습니다");
            }
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
                    <button
                        type="button"
                        className="signup-button"
                        onClick={() => navigate(RouterPath.signup)}
                    >
                        회원가입
                    </button>
                </form>
            </div>
        </div>
    );
}
