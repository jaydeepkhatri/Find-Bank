import {RiLoader5Line} from "react-icons/ri";

function BankList({loading, Banks}) {
    return(
        <>
            <div className="bankslist">
                {
                    loading ? <div className="loader"><RiLoader5Line /></div> :
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
                                Banks.map((Bank, index) => (
                                        <tr key={index}>
                                        <td>{Bank.bank_name}</td>
                                        <td>{Bank.ifsc}</td>
                                        <td>{Bank.branch}</td>
                                        <td>{Bank.bank_id}</td>
                                        <td>{Bank.address}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    </>
                }
            </div>
        </>
        
    )
}

export default BankList;