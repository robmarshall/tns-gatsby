module.exports = function decodeEntities(str) {
    if (typeof window !== 'undefined') {
        // this prevents any overhead from creating the object each time
        const element = document.createElement('div')

        let newStr = str
        if (newStr && typeof newStr === 'string') {
            // strip script/html tags
            newStr = newStr.replace(/<script[^>]*>([\S\s]*?)<\/script>/gim, '')
            newStr = newStr.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gim, '')
            element.innerHTML = str
            newStr = element.textContent
            element.textContent = ''
        }

        return newStr
    }

    return ''
}
