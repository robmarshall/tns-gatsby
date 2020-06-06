export default function stripTags(string) {
    return string.replace(/(<([^>]+)>)/gi, '')
}
