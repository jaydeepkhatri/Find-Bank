import {BiCookie} from "react-icons/bi"

function Info() {
    return(
        <>
            <div className="section" style={{textAlign: "left"}}>
                <h2 className="title">
                    FindBank.
                </h2>
                <p>Find banks of a city.</p>
                <hr/>
                <h3>Code Functions:</h3>
                <ul>
                    <li>Find Banks</li>
                    <li>Implemented Routing</li>
                    <li>Filter By Category (IFSC, Branch, Branch Name)</li>
                    <li>Save banks details</li>
                    <li>Pagination, Update number of items in page</li>
                    <li>404 page</li>
                </ul>
                <div className="border">
                    <p><BiCookie /> Created by <a href="mailto:jaydeepkhatri79@gmail.com">jaydeepkhatri</a></p>
                </div>
            </div>
        </>
    )
}

export default Info;