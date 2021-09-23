import { unWrap, getErrorResponse } from '~/utils/fetchUtils'

export default function ({ $config }, inject) {
	const APPLICATION_ID = $config.algolia.appId
	const headers = {
		'X-Algolia-API-Key': $config.algolia.key,
		'X-Algolia-Application-Id': APPLICATION_ID,
	}

	async function getHomes() {
		try {
			return unWrap(
				await fetch(
					`https://${APPLICATION_ID}-dsn.algolia.net/1/indexes/homes/query`,
					{
						headers,
						method: 'POST',
						body: JSON.stringify({
							hitsPerPage: 3,
							attributesToHighlight: [],
						}),
					}
				)
			)
		} catch (error) {
			return getErrorResponse(error)
		}
	}

	const getHome = async (homeId) => {
		try {
			return unWrap(
				await fetch(
					`https://${APPLICATION_ID}.algolia.net/1/indexes/homes/${homeId}`,
					{
						headers,
					}
				)
			)
		} catch (error) {
			return getErrorResponse(error)
		}
	}

	const getReviewsByHomeId = async (homeId) => {
		try {
			return unWrap(
				await fetch(
					`https://${APPLICATION_ID}.algolia.net/1/indexes/reviews/query`,
					{
						method: 'POST',
						body: JSON.stringify({
							filters: `homeId:${homeId}`,
							hitsPerPage: 6,
							attributesToHighlight: [],
						}),
						headers,
					}
				)
			)
		} catch (error) {
			return getErrorResponse(error)
		}
	}

	const getUserByHomeId = async (homeId) => {
		try {
			return unWrap(
				await fetch(
					`https://${APPLICATION_ID}.algolia.net/1/indexes/users/query`,
					{
						method: 'POST',
						body: JSON.stringify({
							filters: `homeId:${homeId}`,
							attributesToHighlight: [],
						}),
						headers,
					}
				)
			)
		} catch (error) {
			return getErrorResponse(error)
		}
	}

	const getHomesByLocation = async (
		lat,
		lng,
		start,
		end,
		radiusInMeters = 1500 * 15
	) => {
		try {
			const days = []
			for (let day = start; day <= end; day += 86400) {
				days.push(`availability:${day}`)
			}
			return unWrap(
				await fetch(
					`https://${APPLICATION_ID}.algolia.net/1/indexes/homes/query`,
					{
						method: 'POST',
						body: JSON.stringify({
							aroundLatLng: `${lat},${lng}`,
							hitsPerPage: 10,
							filters: days.join(' AND '),
							attributesToHighlight: [],
						}),
						headers,
					}
				)
			)
		} catch (error) {
			return getErrorResponse(error)
		}
	}

	inject('dataApi', {
		getHomes,
		getHome,
		getReviewsByHomeId,
		getUserByHomeId,
		getHomesByLocation,
	})
}
