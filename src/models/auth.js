import BASE_URL from '../config/config';
import axios from 'axios';

const login = axios.post(`${BASE_URL}/auth/login`);