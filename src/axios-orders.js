import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-ea8c8.firebaseio.com/'
});

export default instance;
