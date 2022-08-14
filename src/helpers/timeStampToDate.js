import { format } from 'date-fns'

export default function convertTimeStampToDate(timestamp) {
    // eslint-disable-next-line no-undef
    console.log('timestamp => ', timestamp)

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
