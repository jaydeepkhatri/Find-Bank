import { Link } from "react-router-dom";
import {GrFavorite} from "react-icons/gr";

function Navbar() {
    return (
        <nav>
            <h2 className="title" title="FindBank"><Link to="/">FindBank.</Link></h2>
            <ul className="nav-list">
                <li className="nav-item"><Link to="/favorites" title="See all your Favorites"><GrFavorite /> Favorites</Link></li>
                <li className="nav-item"><Link to="/help" title="Need Help?">Help</Link></li>
                <li className="nav-item"><a href="https://github.com/jaydeepkhatri" title="Visit the Source Code">GitHub</a></li>
            </ul>
            
        </nav>
    )
}

export default Navbar;