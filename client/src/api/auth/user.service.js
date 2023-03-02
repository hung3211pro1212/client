import axios from 'axios';
import authHeader from './auth-header';
import { fileHeader } from './auth-header';
const API_URL = 'http://localhost:4000/users/';

class UserService {
    getUser(username) {
        console.log('auth', authHeader())
        return axios.get(API_URL + `username/${username.data}`, { headers: authHeader() });
    }

<<<<<<< HEAD
    updateAvatar(userName,img) {
        return axios.patch(API_URL + `avatar/${userName}`, {
            file: img.name
        }).then(response => {
=======
    updateAvatar(userName, fileName) {
        const formData = new FormData()
        formData.append('file', fileName)
        return axios.patch(API_URL + `avatar/${userName.data}`, {
            file: formData
        }, { headers: fileHeader() }).then(response => {
>>>>>>> 07c50f1ce3d1b390607c4f490893dfc886f13cdd
            if (response) {
                console.log(response.data)
            }

            return response.data;
        })
    }
}

export default new UserService();