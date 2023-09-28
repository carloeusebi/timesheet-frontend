import axiosInstance from './axios';
import { Ref } from 'vue';

/**
 * Fetches the data
 *
 * @param endpoint The endpoint where to fetch
 * @param ref The ref object where to store data
 */
export const fetch = async (endpoint: string, ref: Ref) => {
	const { data } = await axiosInstance.get(endpoint);
	ref.value = data;
};
