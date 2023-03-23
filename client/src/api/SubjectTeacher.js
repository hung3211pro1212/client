import axios from 'axios';


const API_URL = 'http://localhost:4000/subject-teacher';

class SubjectTeacherService {
    getAll() {
        return axios.get(API_URL);
    }

    getAllbyPage(page) {
        return axios.get(API_URL, {params: {page}});
    }

    create(data) {
        return axios.post(API_URL, data);
    }

    filter(name) {
        return axios.post(API_URL + '/filter', {name: name});
    }
}

export default new SubjectTeacherService();