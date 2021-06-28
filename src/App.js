import { Home } from './components/Home'
import invoices from './common/Invoicedata'
import {ExportToExcel} from './components/ExportToExcel'

function App() {
  return (
    <div>
      <ExportToExcel filename='Invoice' data={invoices} sheetname='Tổng kết doanh thu'/>
      <Home />
    </div>
  );
}

export default App;
