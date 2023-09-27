import { useAuthStore } from '@/stores';
import axios from 'axios';

const baseURL = `${import.meta.env.VITE_API_URL}/api/` || 'http://localhost:8000/api/';

const axiosInstance = axios.create({
	baseURL,
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
});

axiosInstance.interceptors.response.use(
	res => {
		if (res.status >= 200 && res.status <= 299) {
			return res;
		}
		return Promise.reject(res);
	},
	err => {
		if (axios.isAxiosError(err)) {
			if (err.response?.status === 401) {
				const auth = useAuthStore();
				auth.removeUser();
			}
		}
		return Promise.reject(err);
	}
);

export default axiosInstance;
