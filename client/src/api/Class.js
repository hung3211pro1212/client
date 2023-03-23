import axios from 'axios';


const API_URL = 'http://localhost:4000/class/';

class ClassService {
    getClass() {
        return axios.get(API_URL);
    }
    getAllPagination(page) {
        return axios.get(API_URL, {params: {page}});
    }
    createClass(data) {
        console.log(data.khoi)
      const  name =data.name.toUpperCase();
        return axios.post(API_URL, {
            name: name,
            Khoi: data.khoi,
        });
    }

    getClassById(id) {
        return axios.get(API_URL + `${id}`);
    }

    getStudentsByClass(name) {
        return axios.get(API_URL + `students/${name}`);
    }

    filterClass(name) {
        console.log(name);
        return axios.post(API_URL + `filter`, {
            khoiName: name,
        });
    }
    classPagination(page){
        return axios.get(API_URL + `page/${page}`);
    }
}

export default new ClassService();
