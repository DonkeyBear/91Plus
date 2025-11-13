import axios from 'axios'

const api = axios.create({
  baseURL: 'https://donkey-server.fly.dev/plus91/',
  timeout: 5000,
})

export default api
