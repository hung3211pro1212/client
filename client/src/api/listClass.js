import axios from 'axios';


const API_URL = 'http://localhost:4000/list/';

class ListClass {
    getAll() {
        return axios.get(API_URL);
    }
    getListClassById(id) {
        return axios.get(API_URL + `${id}`);
    }
    getListClassByName(name) {
        return axios.get(API_URL + `listclass/${name}`);
    }
}

export default new ListClass();