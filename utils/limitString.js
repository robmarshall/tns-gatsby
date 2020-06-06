module.exports = function limitString(string, length) {
    const fullLength = string.length

    let trimmedString = string.substr(0, length)

    trimmedString = trimmedString.substr(
        0,
        Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
    )

    if (fullLength !== trimmedString.length) {
        return `${trimmedString}...`
    }
    return trimmedString
}
