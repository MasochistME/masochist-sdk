import axios, { AxiosResponse } from 'axios';
import { UpdateResult } from 'mongodb';

import { Badge, ResponseError } from 'v1/types';

/**
 * Updates a badge by updating the fields that the user had passed.
 * @param badgeId string
 * @param badge Partial<Omit<Badge, '_id'>>
 * @returns UpdateResult
 */
export const updateBadgeById = async (
	{ badgeId, badge }: { badgeId: string; badge: Partial<Omit<Badge, '_id'>> },
	BASE_URL: string,
): Promise<UpdateResult> => {
	const url = `${BASE_URL}/badges/badge/${badgeId}`;

	const badgeResponse = await axios.put<
		UpdateResult | ResponseError,
		AxiosResponse<UpdateResult | ResponseError>,
		Partial<Omit<Badge, '_id'>>
	>(url, badge, { validateStatus: () => true });

	const { status, data } = badgeResponse;

	if (status !== 200) throw new Error((data as ResponseError).error);
	return data as UpdateResult;
};