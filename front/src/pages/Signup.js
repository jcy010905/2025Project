import { useState } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import RouterPath from "../router/RouterPath";
import { SignupApi } from "../api/SignupApi";

export default function Signup() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSingup = async (e) => {
            e.preventDefault();
            if (username === ''){
                alert("아이디를 입력하세요");
            }
            else if (password === '') {
                alert("비밀번호를 입력하세요");
            }
            else{
                try {
                    await SignupApi(username, password);
                    navigate(RouterPath.slash);
                    } catch (error) {
                    // console.error('회원가입 실패:', error);
                    }
                navigate(RouterPath.slash);
                alert("회원가입 성공!");
            }
        };

    return (
        <div className="wrapper">
            <div className="login-wrapper">
                <h2>회원가입</h2>
                <form id="signup-form" onSubmit={handleSingup}>
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
                    <input type="submit" value="회원가입" />
                </form>
                <button className="signup-button" onClick={() => navigate(RouterPath.slash)}>
                            돌아가기
                    </button>
            </div>
        </div>
    );
}
