module.exports = {
	runtimeCompiler: true,
	devServer: {
		open: true,
		disableHostCheck: true,
		host: '0.0.0.0',
	},
	css: {
		loaderOptions: {
			scss: {
				prependData: `@import "@/assets/css/overrides.scss";`,
			},
		},
	},
}
