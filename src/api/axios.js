import axios from 'axios'
const instance= axios.create({
    baseURL:"https://task-app-guilebaldo.onrender.com/api",
    withCredentials:true
})

export default instance;