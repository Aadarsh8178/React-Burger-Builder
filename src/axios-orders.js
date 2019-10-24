import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-react-2d2be.firebaseio.com/'
});

export default instance;