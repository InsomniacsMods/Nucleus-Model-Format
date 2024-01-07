const CopyPlugin = require('copy-webpack-plugin')
const PathModule = require('path')

module.exports = {
    mode: 'production',
    target: 'node',
    entry: './src/index.js',
    output: {
        filename: 'nucleus_clay.js',
        path: PathModule.resolve(__dirname, 'dist')
    },
    plugins: [
		new CopyPlugin({
			patterns: [
				{ from: "README.md", to: "about.md" },
			],
		}),
	],
}
