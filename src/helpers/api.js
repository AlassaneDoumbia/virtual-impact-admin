import axios from 'axios';

const host = {
    // "localhost":"http://127.0.0.1:8080/learning",
    "e-learning-c62f7.web.app":"https://virtual-impact-api-spring.herokuapp.com/learning",
    "localhost":"https://virtual-impact-api-spring.herokuapp.com/learning"
}

export default  axios.create({
    // eslint-disable-next-line no-restricted-globals
    baseURL: host[location.hostname]
    // baseURL: "https://virtual-impact-api-spring.herokuapp.com/learning" 

});

//export const baseURL = () => host[location.hostname];