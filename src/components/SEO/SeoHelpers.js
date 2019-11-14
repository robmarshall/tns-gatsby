export function isPost(postType) {
    if (postType === 'post') {
        return true
    }
    return false
}

export function isPage(postType) {
    if (postType === 'page') {
        return true
    }
    return false
}

export function getSingleType(postType){
    if(isPage(postType)){
        return ' - Article'
    }
    return ''
}
