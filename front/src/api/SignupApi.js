import axios from 'axios';

export const loginApi = async (username, password) => {
    try {
        const response = await axios.post('http://localhost:8080/users/signup', {
            username,
            password,
        });

        console.log('회원가입입 성공', response.data);
    } catch (error) {
        console.error('회원가입 실패', error);
    }
};
