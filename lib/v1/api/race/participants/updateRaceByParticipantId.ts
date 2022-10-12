import axios, { AxiosResponse } from 'axios';
import { UpdateResult } from 'mongodb';

import { RacePlayer, ResponseError } from 'v1/types';

type Update = Partial<Pick<RacePlayer, 'startTime' | 'endTime' | 'dnf'>> & {
	score?: number;
};
/**
 * Updates a race participant object.
 * @param raceId string
 * @param discordId string
 * @param update string
 * @returns UpdateResult
 */
export const updateRaceByParticipantId = async (
	{
		raceId,
		discordId,
		update,
	}: {
		raceId: string;
		discordId: string;
		update: Update;
	},
	BASE_URL: string,
): Promise<UpdateResult> => {
	const url = `${BASE_URL}/race/${raceId}/participant/${discordId}`;

	const racePlayerResponse = await axios.put<
		UpdateResult | ResponseError,
		AxiosResponse<UpdateResult | ResponseError>,
		Update
	>(url, update, { validateStatus: () => true });

	const { status, data } = racePlayerResponse;

	if (status !== 200) throw new Error((data as ResponseError).error);
	return data as UpdateResult;
};