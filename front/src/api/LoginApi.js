import axios from 'axios';

export const loginApi = async (username, password) => {
    try {
        const res = await axios.post('http://localhost:8080/users/login', {
            username,
            password,
        });

        localStorage.setItem('accessToken', res.data.accessToken);

        // console.log('로그인 성공', response.data);
    } catch (error) {
        // console.error('로그인 실패', error);
    }
};


