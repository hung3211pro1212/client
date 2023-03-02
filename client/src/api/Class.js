import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/class/';

class UserService {
    getUser(username) {
        return axios.get(API_URL + `username/${username}`, { headers: authHeader() });
    }

    updateAvatar(userName) {
        return axios.patch(API_URL + `username/${userName}`);
    }
}

export default new UserService(); 
