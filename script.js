
const container = document.getElementById('sheet');
const hot = new Handsontable(container, {
  data: [
    ["Name", "Course", "Score"]
  ],
  rowHeaders: true,
  colHeaders: true,
  minSpareRows: 1,   // always one empty row for new entry
  contextMenu: true,
  licenseKey: 'non-commercial-and-evaluation'
});

// Download CSV
function downloadCSV() {
  const exportPlugin = hot.getPlugin('exportFile');
  exportPlugin.downloadFile('csv', {
    filename: 'student_records',
    columnHeaders: true,
    bom: true,
    mimeType: 'text/csv'
  });
}
