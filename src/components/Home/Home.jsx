import invoices from './../../common/Invoicedata'

const Home = () => {
    return (
        <table className="table">   
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Pay</th>
                </tr>
            </thead>
            <tbody>
                {
                    invoices.map((invoice, index) => (
                        <tr key={index}>
                            <th scope="row">{invoice.id}</th>
                            <td>{invoice.cName}</td>
                            <td>{invoice.date}</td>
                            <td>{invoice.price}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Home;