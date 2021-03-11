const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin

module.exports = function onCreateWebpackConfig({ actions }) {
    const runAnalyzer = process.env.GATSBY_ANALYZER
    if (runAnalyzer) {
        actions.setWebpackConfig({
            plugins: [new BundleAnalyzerPlugin()],
        })
    }
}
