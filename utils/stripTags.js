module.exports = function stripTags(string) {
    return string.replace(/(<([^>]+)>)/gi, '')
}
