import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav className = "nav-panel fade-in delay-4s">
            <ul>
                <li><Link to = "/">Home</Link></li>
                <li><Link to = "/about">About</Link></li>
                <li><Link to = "/contact">Contact</Link></li>
            </ul>
        </nav>
    );
}

export default Nav;