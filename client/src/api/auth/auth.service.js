import axios from 'axios';

const API_URL = 'http://localhost:4000/auth/';

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'sign-in', {
                userName: user.username,
                password: user.password
            })
            .then(response => {
                if (response.data.accessToken) {
                    console.log(response.data)
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }


}

export default new AuthService();