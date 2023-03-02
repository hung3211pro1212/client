import axios from 'axios';


const API_URL = 'http://localhost:4000/class/';

class Class {
    getClass() {
        return axios.get(API_URL);
    }
    getClassById(id) {
        return axios.get(API_URL + `${id}`);
    }
    getStudentsByClass(name) {
        return axios.get(API_URL + `students/${name}`);
    }
}

export default new Class();
