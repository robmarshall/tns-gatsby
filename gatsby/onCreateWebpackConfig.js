const path = require(`path`)

// Fix any node/webpack react dependency issues
module.exports = function onCreateWebpackConfig({
    stage,
    rules,
    loaders,
    plugins,
    actions,
}) {
    // This connects all plugins with react during development to
    // stop any errors.
    actions.setWebpackConfig({
        resolve: {
            alias: {
                react: path.join(process.cwd(), 'node_modules/react'),
            },
        },
    })
}
