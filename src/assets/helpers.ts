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

/**
 * Calculates the activity duration based on the start and the end.
 * @param start - The starting DateTime
 * @param end - The end DateTime
 */
export const calculateHours = (start: string, end: string) => {
	const oneHour = 3_600_000;

	const startTime = new Date(start).getTime();
	const endTime = new Date(end).getTime();

	const hours = (endTime - startTime) / oneHour;

	return Math.floor(hours);
};
