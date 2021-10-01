const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')

module.exports = function onCreateWebpackConfig({ actions }) {
    actions.setWebpackConfig({
        plugins: [
            new FilterWarningsPlugin({
                exclude:
                    /mini-css-extract-plugin[^]*Conflicting order. Following module has been added:/,
            }),
        ],
    })
}
