import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav className = "nav-panel fade-in delay-4s">
            <ul>
                <li><Link to = "/">Home</Link></li>
                <li><Link to = "/about">About</Link></li>
                <li><Link to = "/contact">Contact</Link></li>
                <li><Link to = "/hw1">Homework 1</Link></li>
                <li><Link to = "/lab2">Lab 2</Link></li>
                <li><Link to = "/hw2">Homework 2</Link></li>
                
                <li><Link to = "/signup">Sign Up</Link></li>
            </ul>
        </nav>
    );
}

export default Nav;