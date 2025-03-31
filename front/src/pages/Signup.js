import { useState } from "react";
import "../css/Login.css";

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSingup = () => {
        // 로그인 페이지로 이동
    };

    return (
        <div className="wrapper">
            <div className="login-wrapper">
                <h2>회원가입</h2>
                <form id="login-form" onSubmit={handleSingup}>
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
                </form>
            </div>
        </div>
    );
}
