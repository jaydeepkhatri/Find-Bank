import img from "../../assets/images/404.png";
import {Link} from "react-router-dom";

function Lost() {
    return (
        <>
            <div className="section lost">
                <img src={img} className="img" />
                <h2>It seems you are lost..</h2>
                <Link to="/" className="btn" title="Redirect to Homepage">Home page</Link>
            </div>
            
        </>
        
    )
}

export default Lost;