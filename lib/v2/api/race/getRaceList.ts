import axios, { AxiosResponse } from 'axios';

import { Race, ResponseError } from 'v2/types';

/**
 * Returns a list of all the races that were ever registered.
 * @returns Race[] | ResponseError
 */
export const getRaceList =
	async () =>
	async (BASE_URL: string): Promise<Race[] | ResponseError> => {
		const url = `${BASE_URL}/race/list`;

		const raceResponse = await axios.get<
			Race[] | ResponseError,
			AxiosResponse<Race[] | ResponseError>
		>(url, { validateStatus: () => true });

		const { status, data } = raceResponse;

		if (status !== 200) throw new Error((data as ResponseError).error);
		return data as Race[];
	};