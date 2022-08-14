export default function arraySearch(array, keyword, keys) {
    const searchTerm = keyword.toLowerCase()

    return array.filter(item => {
        return keys.some(key => String(item[key]).toLowerCase().includes(searchTerm))
    })
}
