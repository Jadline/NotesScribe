export function dateFormatter(isodate){
    const date = new Date(isodate)
    const formattedDate = date.toLocaleDateString("en-US",{
        year : 'numeric',
        month : 'long',
        day : 'numeric'
    })
    return formattedDate
}