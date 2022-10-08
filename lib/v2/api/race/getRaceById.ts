import { ObjectId } from 'mongodb';
import axios, { AxiosResponse } from 'axios';

import { Race, ResponseError } from 'v2/types';

/**
 * Returns a race fron the database given the id, if it exists.
 * @param id ObjectId
 * @returns Race | ResponseError
 */
export const getRaceById =
	async ({ id }: { id: ObjectId }) =>
	async (BASE_URL: string): Promise<Race | ResponseError> => {
		const url = `${BASE_URL}/race/id/${id}`;

		const raceResponse = await axios.get<
			Race | ResponseError,
			AxiosResponse<Race | ResponseError>
		>(url);

		const { status, data } = raceResponse;

		if (status !== 200) throw data as ResponseError;
		return data as Race;
	};
