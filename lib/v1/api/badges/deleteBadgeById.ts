import axios, { AxiosResponse } from 'axios';
import { DeleteResult } from 'mongodb';

import { ResponseError } from 'v1/types';

/**
 * Deletes a badge.
 * @param badgeId string
 * @returns DeleteResult
 */
export const deleteBadgeById = async (
	{ badgeId }: { badgeId: string },
	BASE_URL: string,
): Promise<DeleteResult> => {
	const url = `${BASE_URL}/badges/badge/${badgeId}`;

	const badgeResponse = await axios.delete<
		DeleteResult | ResponseError,
		AxiosResponse<DeleteResult | ResponseError>
	>(url, { validateStatus: () => true });

	const { status, data } = badgeResponse;

	if (status !== 200) throw new Error((data as ResponseError).error);
	return data as DeleteResult;
};