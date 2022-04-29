import {RiLoader5Line} from "react-icons/ri";
import {AiOutlineStar, AiFillStar} from "react-icons/ai";

function BankList({loading, Banks, addFavorite}) {


        // Get data from browser cookie & condition check it.
        // try loops
        let favoritesarr = [];

        if(localStorage.getItem("Favorites")) {
            favoritesarr = JSON.parse(localStorage.getItem("Favorites"));
        } 
        

        let getIFSC = [].concat(...favoritesarr).map(({ifsc})=>ifsc);

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
                                <th>Save</th>
                            </tr>
                            {
                                Banks.map((Bank, index) => (
                                    <tr key={index}>
                                        <td>{Bank.bank_name}</td>
                                        <td>{Bank.ifsc}</td>
                                        <td>{Bank.branch}</td>
                                        <td>{Bank.bank_id}</td>
                                        <td>{Bank.address}</td>
                                        {
                                            (getIFSC.indexOf(Bank.ifsc) >= 0)
                                            ? <td className="star"><AiFillStar onClick={() => addFavorite(Bank)} /></td>
                                            : <td className="star"><AiOutlineStar onClick={() => addFavorite(Bank)} /></td>
                                        }
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