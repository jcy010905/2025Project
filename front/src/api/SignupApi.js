import axios from 'axios';

export const SignupApi = async (username, password) => {
    try {
        await axios.post('http://localhost:8080/users/signup', {
            username,
            password,
        });
    } catch (error) {
        // console.error('회원가입 실패', error);
    }
};
