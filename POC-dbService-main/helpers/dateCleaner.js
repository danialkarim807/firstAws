function dateCleaner (date) {
    const words = date.split(" ")
    dateObj = {date: words[2] + " " + words[1] + " " + words[3], time: words[4]}
    return dateObj
}

module.exports = dateCleaner