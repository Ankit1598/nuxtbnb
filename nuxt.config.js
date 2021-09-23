export default {
	rootUrl:
		process.env.NODE_ENV === 'production'
			? 'https://masteringnuxtbnb.vercel.app'
			: 'http://localhost:3000',
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		titleTemplate: 'NuxtBnB | %s',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'~/plugins/maps.client',
		'~/plugins/dataApi',
		'~/plugins/auth.client',
		'~/plugins/vCalendar.client',
		'~/plugins/stripe.client',
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		// https://go.nuxtjs.dev/tailwindcss
		'@nuxtjs/tailwindcss',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		'~/modules/auth',
		'~/modules/algolia',
		'~/modules/cloudinary',
		'~/modules/stripe',
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		'@nuxtjs/dotenv',
		'@nuxtjs/cloudinary',
		'@nuxt/image',
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {},

	tailwind: {
		cssPath: '~/assets/css/tailwind.css',
		configPath: 'tailwind.config.js',
		exposeConfig: false,
		config: {},
	},

	cloudinary: {
		cloudName: process.env.CLOUDINARY_CLOUD_NAME,
	},

	image: {
		cloudinary: {
			baseURL: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/`,
		},
	},

	router: {
		prefetchLinks: false,
	},

	publicRuntimeConfig: {
		auth: {
			cookieName: 'idToken',
			clientId: process.env.OAUTH_CLIENT_ID,
		},
		algolia: {
			appId: process.env.ALGOLIA_APPLICATION_ID,
			key: process.env.ALGOLIA_API_KEY_PUBLIC,
		},
		cloudinary: {
			apiKey: process.env.CLOUDINARY_API_KEY,
		},
		stripe: {
			key: process.env.STRIPE_PUBLISHABLE_KEY,
		},
	},

	privateRuntimeConfig: {
		algolia: {
			appId: process.env.ALGOLIA_APPLICATION_ID,
			key: process.env.ALGOLIA_API_KEY_PRIVATE,
		},
		cloudinary: {
			apiSecret: process.env.CLOUDINARY_API_SECRET,
		},
		stripe: {
			secretKey: process.env.STRIPE_SECRET_KEY,
		},
	},
}
