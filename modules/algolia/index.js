import usersRouter from './routers/users'
import homesRouter from './routers/homes'
import getApis from './apis'
import bodyParser from 'body-parser'

export default function () {
	const algoliaConfig = this.options.privateRuntimeConfig.algolia
	const apis = getApis(algoliaConfig)

	this.nuxt.hook('render:setupMiddleware', (app) => {
		app.use(bodyParser.json())
		
		app.use('/api/user', usersRouter(apis))
		app.use('/api/homes', homesRouter(apis))
	})
}
