import {AiOutlineStar, AiFillStar} from "react-icons/ai";
import {Link} from "react-router-dom";
import img from "../../assets/images/nodata.png";

function Favorites ({addFavorite, clearAllFavorites}){

    //Get data from Local storage
    let Banks = [];

    if(localStorage.getItem("Favorites")) {
        Banks = JSON.parse(localStorage.getItem("Favorites"));
        Banks = Banks.filter(Boolean);
        localStorage.setItem("Favorites",JSON.stringify(Banks))
    }

    let getIFSC = [].concat(...Banks).map(({ifsc})=>ifsc);
    //console.log(Banks);


    
    

    return (
        <>
            
            <div className="bankslist">
            {
                <>
                {Banks.length > 0 
                    ? 
                    <>  
                        <div className="topfav">
                            <h2>Favorites</h2>
                            <a href="#" className="btn" onClick={() => clearAllFavorites()}>Clear All</a>
                        </div>
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
                : <>
                    <div style={{textAlign: "center"}}>
                        <img src={img} className="img" />
                        <h2>Oops, No data found!</h2>
                        <p style={{marginTop: "12px"}}>Click on stars(<AiOutlineStar />) to save..</p>
                        <Link to="/" className="btn" title="Visit Homepage">Homepage</Link>
                    </div>
                    </>
                }
                </>
            }
            </div>
        </>
        
    )
}

export default Favorites;