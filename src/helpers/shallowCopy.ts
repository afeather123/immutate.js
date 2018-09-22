function shallowCopy(obj: any) {
    if(Array.isArray(obj)) {
        return [...obj]
    } else if(typeof obj === 'object') {
        return {...obj}
    } else {
        return obj
    }
}

export default shallowCopy