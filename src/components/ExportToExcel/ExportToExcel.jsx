import { saveAs } from 'file-saver'
import * as Excel from 'exceljs'

function exTest(data, filename, sheetname) {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet(sheetname);
    worksheet.mergeCells('A1:D1');
    worksheet.getCell('A1').value = sheetname;
    worksheet.getCell(`A1`).alignment = { horizontal: 'center' };
    worksheet.getRow(2).values = ["Mã đơn hàng", "Tên khách hàng", "Ngày bán", "Thanh toán"];
    worksheet.columns = [
        { key: 'id' },
        { key: 'cName' },
        { key: 'date' },
        { key: 'price' }
    ]
    data.forEach((element) => {
        worksheet.addRow(element);
    })

    const myFooter = getFooter(data);

    worksheet.getRow(data.length + 3).values = myFooter
    worksheet.mergeCells(`A${data.length + 3} : C${data.length + 3}`);
    
    setStyle(data, worksheet)

    workbook.xlsx.writeBuffer().then(data => {
        const blob = new Blob([data], { type: 'xlsx' });
        saveAs(blob, `${filename}.xlsx`);
    });
};

const setStyle = (data, worksheet) => {
    worksheet.getRow(1).getCell('A').fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: {
            argb: "FFFF7D7D"
        },
        bgColor: {
            argb: "FF000000"
        }
    }
    const column = ['A2', 'B2', 'C2', 'D2',`A${data.length + 3}` , `D${data.length + 3}`];

    column.map((key) => (
        worksheet.getCell(key).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: {
                argb: "FFFF7D"
            },
            bgColor: {
                argb: "FF000000"
            }
        }
    ))
    column.map((key) => (
        worksheet.getCell(key).font = {
            family: 4,
            size: 13,
            bold: true
        }
    ))

    worksheet.getCell('A1').font = {
        name: 'Comic Sans MS',
        family: 4,
        size: 20,
        bold: true
    };
    worksheet.columns = [ { key: 'A', width: 15 }, { key: 'B', width: 40 }, { key: 'C', width: 40}, { key: 'D', width: 40 } ];

}

const getFooter= (data) => {
    const footer = [];
    footer[0] = 'Tổng tiền';
    const columns = Object.keys(data[0]);
    for (var i = 1; i < columns.length - 1; i++) {
        footer[i] = '';
    }
    const total = data.map(item => item.price).reduce((a, b) => a + b).toFixed(2);
    footer[data.length - 2] = parseFloat(total);
    return footer;
}

const ExportToExcel = (props) => {
    return (
        <div>
            <button className="btn btn-primary mt-2 mb-2" onClick={() => { exTest(props.data, props.filename, props.sheetname) }}>Export ExcelJS</button>
        </div>
    )
}

export default ExportToExcel;