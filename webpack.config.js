const path = require('path')

const DefinePlugin = require('webpack/lib/DefinePlugin')

module.exports = function (environment) {
	console.log(`Debug: ${JSON.stringify(environment.debug || false)}`)
	console.log(`Development: ${JSON.stringify(environment.development || false)}`)

	return {
		devtool: false,
		mode: environment.development ? 'development' : 'production',
		output: {
			ecmaVersion: 2015,
		},
		cache: {
			type: 'filesystem',
			cacheDirectory: path.resolve(__dirname, '.cache'),
			buildDependencies: {
				config: [
					__filename
				],
			},
		},
		optimization: {
			minimize: !environment.development,
		},
		plugins: [
			new DefinePlugin({
				__DEV__: !!environment.development,
				__DEBUG__: !!environment.debug,
			})
		]
	}
}
