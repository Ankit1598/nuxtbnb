import usersApi from './users'
import homesApi from './homes'

export default (algoliaConfig) => {
	return { users: usersApi(algoliaConfig), homes: homesApi(algoliaConfig) }
}
