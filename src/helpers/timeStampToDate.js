import { format } from 'date-fns'

export default function convertTimeStampToDate(timestamp) {
    if (!timestamp) return

    const years = timestamp.toDate().getFullYear()
    const month = timestamp.toDate().getMonth() < 10 ? '0' + timestamp.toDate().getMonth() : timestamp.toDate().getMonth()
    const date = timestamp.toDate().getDate() < 10 ? '0' + timestamp.toDate().getDate() : timestamp.toDate().getDate()

    return new Date(years, month, date)
}

export function converTimeStampToFormatedDate(timestamp) {
    if (!timestamp) return

    const years = timestamp.toDate().getFullYear()
    const month = timestamp.toDate().getMonth() < 10 ? '0' + timestamp.toDate().getMonth() : timestamp.toDate().getMonth()
    const date = timestamp.toDate().getDate() < 10 ? '0' + timestamp.toDate().getDate() : timestamp.toDate().getDate()

    return format(new Date(years, month, date), 'dd/MM/yyyy')
}

export function converTimeStampToFormatedDateAndTime(timestamp) {
    if (!timestamp) return

    const years = timestamp.toDate().getFullYear()
    const month = timestamp.toDate().getMonth() < 10 ? '0' + timestamp.toDate().getMonth() : timestamp.toDate().getMonth()
    const date = timestamp.toDate().getDate() < 10 ? '0' + timestamp.toDate().getDate() : timestamp.toDate().getDate()
    const [hour, minutes, seconds] = [
        timestamp.toDate().getHours(),
        timestamp.toDate().getMinutes(),
        timestamp.toDate().getSeconds(),
    ]

    return format(new Date(years, month, date, hour, minutes, seconds), 'dd/MM/yyyy hh:mm:ss')
}
