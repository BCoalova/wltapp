export default function convertTimeStampToDate(timestamp) {
    const years = timestamp.toDate().getFullYear()
    const month = timestamp.toDate().getMonth() < 10 ? '0' + timestamp.toDate().getMonth() : timestamp.toDate().getMonth()
    const date = timestamp.toDate().getDate() < 10 ? '0' + timestamp.toDate().getDate() : timestamp.toDate().getDate()

    return new Date(years, month, date)
}
