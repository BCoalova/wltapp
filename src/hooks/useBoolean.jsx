import { useCallback, useState } from 'react'

const useBoolean = (initial = false) => {
    const [value, setValue] = useState(initial)

    const makeFalse = useCallback(() => setValue(false), [])

    const makeTrue = useCallback(() => setValue(true), [])

    const toggle = useCallback(() => setValue(prevState => !prevState), [])

    const reset = useCallback(() => setValue(initial), [initial])

    return [value, makeFalse, makeTrue, toggle, reset]
}

export default useBoolean
