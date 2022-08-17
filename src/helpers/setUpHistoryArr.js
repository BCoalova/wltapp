import { sortByDate } from './ArraySorts'

export default function setUpHistoryArr(excercise) {
    const newList = [
        { series: excercise.series, createdAt: excercise.createdAt, orderNum: 0 },
        ...excercise.history.map(el => ({ ...el, createdAt: el.date, orderNum: el.orderNum + 1 })),
    ]
    return sortByDate(newList, 'createdAt', false)
}
