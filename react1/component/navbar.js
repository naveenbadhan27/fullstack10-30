import React from 'react';
import {Link} from 'react-router-dom';

function Navbar(){
	return(
		<>
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <ul className="nav navbar-nav">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/about'>About</Link></li>
                </ul>
            </div>
        </nav>
		</>
	)
}
export default Navbar;