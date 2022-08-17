import { converTimeStampToFormatedDateAndTime } from './timeStampToDate'

const makeDate = str => {
    const [, /* _ */ dd, mm, yyyy, hh, min, ss] = str.match(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/)
    return new Date(yyyy, mm - 1, dd, hh, min, ss)
}

export function sortByDate(array, keyword, asc = true) {
    return array.sort(function (a, b) {
        return asc
            ? makeDate(converTimeStampToFormatedDateAndTime(a[keyword])) -
                  makeDate(converTimeStampToFormatedDateAndTime(b[keyword]))
            : makeDate(converTimeStampToFormatedDateAndTime(b[keyword])) -
                  makeDate(converTimeStampToFormatedDateAndTime(a[keyword]))
    })
}
