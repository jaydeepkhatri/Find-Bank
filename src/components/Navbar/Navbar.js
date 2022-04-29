import { Link } from "react-router-dom";
import {GrFavorite} from "react-icons/gr";
import {AiFillInfoCircle, AiFillGithub, AiOutlineStar} from "react-icons/ai";

function Navbar() {
    return (
        <nav>
            <h2 className="title" title="FindBank"><Link to="/">FindBank.</Link></h2>
            <ul className="nav-list">
                <li className="nav-item"><Link to="favorites" title="See all your Favorites"><AiOutlineStar /> Favorites</Link></li>
                <li className="nav-item"><Link to="info" title="Information about Project"><AiFillInfoCircle /> Info</Link></li>
                <li className="nav-item"><a href="https://github.com/jaydeepkhatri" title="Visit the Source Code"><AiFillGithub /> GitHub</a></li>
            </ul>
            
        </nav>
    )
}

export default Navbar;