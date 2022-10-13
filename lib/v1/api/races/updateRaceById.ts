import axios, { AxiosResponse } from 'axios';
import { UpdateResult } from 'mongodb';

import { Race, ResponseError } from 'v1/types';

/**
 * Updates a race by updating the fields that the user had passed.
 * @param raceId string
 * @param race Partial<Omit<Race, '_id'>>
 * @returns UpdateResult
 */
export const updateRaceById = async (
	{ raceId, race }: { raceId: string; race: Partial<Omit<Race, '_id'>> },
	BASE_URL: string,
): Promise<UpdateResult> => {
	const url = `${BASE_URL}/races/race/${raceId}`;

	const raceResponse = await axios.put<
		UpdateResult | ResponseError,
		AxiosResponse<UpdateResult | ResponseError>,
		Partial<Omit<Race, '_id'>>
	>(url, race, { validateStatus: () => true });

	const { status, data } = raceResponse;

	if (status !== 200) throw new Error((data as ResponseError).error);
	return data as UpdateResult;
};