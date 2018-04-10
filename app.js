const SEPARATOR = '|';
const HEADER_VALUE = ':-:';

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
            alignRow.push(HEADER_VALUE);
            alignRow.push(SEPARATOR);
        }
        // insert alignment info row
        data.splice(1, 0, alignRow);
    },
    beforePaste: function (data, coords) {
        if (data.length === 1) {
            return;
        }
        var headerRowOddNumberedColumns  = _.filter(data[1], function (v, k) {
            return (k + 1) % 2 === 1;
        });
        var headerRowEvenNumberedColumns = _.filter(data[1], function (v, k) {
            return (k + 1) % 2 === 0;
        });

        var isMarkdownTable =
            _.every(headerRowOddNumberedColumns, function (v) {
                return v === SEPARATOR;
            })
            && _.every(headerRowEvenNumberedColumns, function (v) {
                return v === HEADER_VALUE;
            });

        if (!isMarkdownTable) {
            return;
        }

        // retrieve markdown table value
        for (var rowIndex = 0; rowIndex < data.length; rowIndex++) {
            if (rowIndex === 1) {
                continue;
            }
            var row = data[rowIndex];
            var evenNumberedColumns = _.filter(row, function (v, k) {
                return (k + 1) % 2 === 0;
            });
            // replace data
            data[rowIndex] = evenNumberedColumns;
        }
        // remove header row
        data.splice(1, 1);
    }
});