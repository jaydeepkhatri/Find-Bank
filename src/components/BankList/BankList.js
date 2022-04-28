

function BankList({Banks}) {
    return(
        <>
            <table>
                <tbody>
                    <tr>
                        <th>Bank</th>
                        <th>IFSC</th>
                        <th>Branch</th>
                        <th>Bank ID</th>
                        <th>Address</th>
                    </tr>
                    {
                        Banks.map((Bank, index) => {
                            <tr key={index}>
                                <td>{Bank.bank_name}</td>
                                <td>{Bank.ifsc}</td>
                                <td>{console.log(Bank.branch)}</td>
                                <td>{Bank.bank_id}</td>
                                <td>{Bank.address}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </>
        
    )
}

export default BankList;