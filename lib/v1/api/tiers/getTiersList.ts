import axios, { AxiosResponse } from 'axios';

import { Tier, ResponseError } from 'v1/types';

/**
 * Returns a list of all tiers.
 * @returns Tier[]
 */
export const getTiersList = async (BASE_URL: string): Promise<Tier[]> => {
	const url = `${BASE_URL}/tiers/list`;

	const raceResponse = await axios.get<
		Tier[] | ResponseError,
		AxiosResponse<Tier[] | ResponseError>
	>(url, { validateStatus: () => true });

	const { status, data } = raceResponse;

	if (status !== 200) throw new Error((data as ResponseError).error);
	return data as Tier[];
};