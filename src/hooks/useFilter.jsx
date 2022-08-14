import { useCallback, useEffect, useState } from 'react'
import arraySearch from '../helpers/arraySearch'

export default function useFilter(list, filterKeywords) {
    const [value, setValue] = useState('')
    const [results, setResults] = useState(list)

    useEffect(() => {
        if (!list.length || list == undefined) return
        setResults(list)
    }, [list])

    const reset = useCallback(() => {
        setValue('')
        setResults(list)
    }, [list])

    const bind = {
        value,
        onChange: e => {
            setValue(e.target.value)
            setResults(arraySearch(list, e.target.value, filterKeywords))
        },
    }

    return [bind, results, reset]
}
