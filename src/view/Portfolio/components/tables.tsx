const renderTable = (data, headers) => {
    let tableHtml = "<table><thead>"
    headers.forEach(header => {
        tableHtml += "<td>" + header + "</td>"
    })
    tableHtml += "</thead>"
    data.forEach(row => {
        tableHtml += "<tr>"
        row.forEach(item => {
            tableHtml += "<td>" + item + "</td>"
        })
        tableHtml += "</tr>"
    })
    tableHtml += "</table>"
    return tableHtml
}


export default renderTable