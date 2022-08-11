import { useCallback, useState } from 'react'

export default function useInput(initialValue = '') {
    const [value, setValue] = useState(initialValue)

    const handleUpdate = useCallback(newValue => setValue(newValue), [])
    const handleReset = useCallback(() => setValue(initialValue), [initialValue])
    const checkIfEmpty = useCallback(() => (value ? !!value : !!value), [value])

    const bind = {
        value,
        onChange: e => setValue(e.target.value),
    }

    return [value, bind, handleReset, handleUpdate, checkIfEmpty]
}
