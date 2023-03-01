import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/users/';

class UserService {
    getUser(username) {
        return axios.get(API_URL + `username/${username}`, { headers: authHeader() });
    }

    updateAvatar(userName) {
        return axios.patch(API_URL + `avatar/${userName}`, {
            file: img.name
        }).then(response => {
            if (response) {
                console.log(response.data)
            }

            return response.data;
        })
    }
}

export default new UserService();