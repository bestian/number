var webpack = require('webpack')
module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/number/'
    : '/',
	lintOnSave: false,
	configureWebpack: {
		plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
			"root.jQuery": "jquery",
			semantic: "semantic-ui-css",
			Semantic: "semantic-ui-css",
			"semantic-ui": "semantic-ui-css",
		})]
	}
}