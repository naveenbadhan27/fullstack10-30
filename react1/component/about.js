import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Navbar from "./navbar";
function About(){

	const token = localStorage.getItem('token');
	if(token == null){
		window.location.href='/';
	}

	const [name, setName] = useState('');

	function session(){
		setName(token);
	}

	useEffect(() => {
		session();
	}, [])

	function logout(){
		localStorage.removeItem('token');
		window.location.href='/';
	}


	return(
		<>
		<Navbar />
		<div>
		<button className="btn btn-danger" onClick={logout}>Logout</button>
			<h1>Welcome {name}</h1>

		</div>

		</>
	)
}


export default About;