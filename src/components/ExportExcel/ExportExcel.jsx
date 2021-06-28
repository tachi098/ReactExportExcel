import XLSX from 'xlsx'
import { saveAs } from 'file-saver'

const exportToExcel = (data, filename, sheetname) => {
    const myFooter = getFooter(data);
    const myHeader = Object.keys(data[0]);
    var Heading = [
        [sheetname],
        ["Mã đơn hàng", "Tên khách hàng", "Ngày bán", "Thanh toán"]
    ];
    var wscols = [
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 }
    ];
    const merge = [{ s: { c: 0, r: 0 }, e: { c: myHeader.length - 1, r: 0 } }];

    const ws = XLSX.utils.aoa_to_sheet(Heading);
    ws['!cols'] = wscols;
    ws['!merges'] = merge;

    XLSX.utils.sheet_add_json(ws, data, {
        header: myHeader,
        skipHeader: true,
        origin: -1,
    });

    XLSX.utils.sheet_add_aoa(ws, [
        myFooter
    ], { origin: -1 });

    var wb = XLSX.utils.book_new();
    ws["A1"].s = {									// set the style for target cell
        font: {
          sz: 24,
          bold: true,
          color: { rgb: "FFFFAA00" }
        },
      };
    XLSX.utils.book_append_sheet(wb, ws, filename);
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' },);
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), `${filename}.xlsx`);
}

const getFooter = (data) => {
    const footer = [];
    footer[0] = 'Tổng tiền';
    const columns = Object.keys(data[0]);
    for (var i = 1; i < columns.length - 1; i++) {
        footer[i] = '';
    }
    const total = data.map(item => item.price).reduce((a, b) => a + b).toFixed(2);
    footer[data.length - 2] = parseInt(total);
    return footer;
}

const ExportExcel = (props) => {
    return (
        <button className="btn btn-primary mt-2 mb-2" onClick={() => { exportToExcel(props.data, props.filename, props.sheetname) }}>Export Excel file</button>
    )
}

export default ExportExcel