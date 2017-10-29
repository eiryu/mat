const SEPARATOR = '|';

var data = [
    ['header1', 'header2'],
    ['foo', 'bar']
];

var container = document.getElementById('hot');
new Handsontable(container, {
    data: data,
    minRows: 5,
    minCols: 5,
    rowHeaders: true,
    colHeaders: true,
    contextMenu: true,
    beforeCopy: function (data, coords) {
        // row
        for (var rowIndex = 0; rowIndex < data.length; rowIndex++) {
            var row = data[rowIndex];
            // column
            var convertedRow = [SEPARATOR];
            for (var columnIndex = 0; columnIndex < row.length; columnIndex++) {
                convertedRow.push(row[columnIndex]);
                convertedRow.push(SEPARATOR);
            }
            // replace data
            data[rowIndex] = convertedRow;
        }
        // alignment info row
        var alignRow = [SEPARATOR];
        var columnCount = coords[0].endCol - coords[0].startCol + 1;
        for (var i = 0; i < columnCount; i++) {
            alignRow.push(':-:');
            alignRow.push(SEPARATOR);
        }
        // insert alignment info row
        data.splice(1, 0, alignRow);
    }
});