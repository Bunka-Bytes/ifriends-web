import axios from 'axios';
import { getToken } from './auth';

const API_URL = "/api"

export const api = axios.create({
	baseURL: process.env.REACT_APP_API_URL || 'https://localhost/8080'
});

api.interceptors.request.use(async config => {
	const token = getToken();
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
