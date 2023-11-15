import axios from 'axios'

const API_URL = 'http://localhost:5001/api/v1/'

const register  = async (userData) => {
            const response = await axios.post(API_URL+'auth/register', userData)
    
            if(response.data) {
                localStorage.setItem('user', JSON.stringify(response.data))
            }
            return response.data
        }

const login  = async (userData) => {
            const response = await axios.post(API_URL+'auth/login', userData)
    
            if(response.data) {
                localStorage.setItem('user', JSON.stringify(response.data))
            }
            return response.data
        }

// Logout user        
const logout = () => localStorage.removeItem('user')


const authService = {
    register,
    login,
    logout
}

export default authService