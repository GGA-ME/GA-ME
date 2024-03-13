import axios from 'axios';

const api = axios.create({
    // URL주소 입력
    baseURL: 'http://API주소'
});

export const fetchProtectedData = async () => {
    try {
        const response = await api.get('/protected');
        return response.data;
    } catch (error) { console.log(error); }
};

export { api };
