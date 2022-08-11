import { useState } from 'react'

export default function useAdd() {
    const [series, setSeries] = useState([{ reps: 0, weight: '', addingFactor: 1, id: 0 }])
    const handleAddSerie = () => {
        setSeries(prev => [...prev, { reps: 0, weight: '', addingFactor: 1, id: prev[prev.length - 1].id + 1 }])
    }
    const handleRemoveSerie = () => {
        if (series.length === 1) return
        let newSeries = [...series]
        newSeries.pop()
        setSeries(newSeries)
    }
    const handleAddRep = id => {
        let newSeries = [...series]
        let isChanging = newSeries.find(el => el.id === id)
        isChanging.reps = parseInt(isChanging.reps) + isChanging.addingFactor
        setSeries(newSeries)
    }
    const handleRemoveRep = id => {
        let newSeries = [...series]
        let isChanging = newSeries.find(el => el.id === id)

        if (parseInt(isChanging.reps) - isChanging.addingFactor < 0) {
            isChanging.reps = 0
        } else {
            isChanging.reps = parseInt(isChanging.reps) - isChanging.addingFactor
        }

        setSeries(newSeries)
    }
    const handleChangeWeight = (e, id) => {
        let newSeries = [...series]
        let isChanging = newSeries.find(el => el.id === id)
        isChanging.weight = e.target.value
        setSeries(newSeries)
    }
    const handleChangeAddingFactor = (id, newAddingFactor) => {
        let newSeries = [...series]
        let isChanging = newSeries.find(el => el.id === id)
        isChanging.addingFactor = newAddingFactor
        setSeries(newSeries)
    }

    return [
        series,
        {
            useAddSerie: [handleAddSerie, handleRemoveSerie],
        },
        {
            useAddRep: [handleAddRep, handleRemoveRep],
        },
        {
            useAddWeight: [handleChangeWeight, handleChangeAddingFactor],
        },
    ]
}
