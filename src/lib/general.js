import React from 'react'

// function getPathSafeDatetime() {
//     let datetime = Date.now()
//     // let datetime = new Date()
//     // datetime.replace(/\//g, '-').replace(',', '').replace(/:/g, '_').replace(/ /g, '+')
//     return datetime
// }

// function friendlyDate(str) {
//     let friendly_date = str.replace(/-/g, '/').replace(/\+/g, ' ').replace(/_/g, ':')
//     return friendly_date
// }

function uniqid() {
    return Math.random().toString(36).substr(2, 9)
}


export { uniqid }
