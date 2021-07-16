import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Navbar from './navbar';
import Axios from 'axios';
import { func } from 'prop-types';
function Home(){

	const [name, setName] = useState('');


function frmsubmit(){
	var email = 'abc@gmail.com';
	var password = '123456789';
	// alert('hi '+name);
	// localStorage.setItem('token',name);
	// window.location.href='/about';
	Axios.post('http://localhost:30/insertdata', {
		Name:name,
		Email:email,
		Password:password
	}).then(function(succ){
		// console.log(succ);
		if(succ.data == true){
			alert('Yes');
			getuserdata();
		}else{
			alert('No');
		}
	})
}

function frmsubmits(x){
	alert(x);
}

const [users, setUsers] = useState([]);
 
function getuserdata(){
	Axios.get('http://localhost:30/fetchdata').then(function(succ){
		// console.log(succ.data)
		setUsers(succ.data);
	})
}


function deleteuser(x){
	Axios.post('http://localhost:30/deletedata',{id:x}).then(function(succ){
		if(succ.data == true){
			alert('Deleted');
			getuserdata()
		}else{
			alert('Error');
		}
	})
}

function edituser(x) {
	window.location.href='/Edit/?id='+x;
}

useEffect(() => {
	getuserdata();
}, [])





	return(
		<>
		<Navbar />
		<div className="col-lg-12">

			<h1>Welcome to Home</h1>
			<div className="col-lg-4 col-lg-offset-2">
				<div className="form-group">
					<input type='text' id='name' className='form-control' onChange={(event) => {setName(event.target.value)}} placeholder="Fill your name" />
				</div>
				<div className="form-group">
					<button className="btn btn-info" onClick={frmsubmit}>Click</button>
					<button className="btn btn-danger" onClick={() => frmsubmits('Hello')}>Click</button>					
				</div>

			</div>

			<div className="col-lg-6">
				<table className="table table-hover table-bordered">
					<thead>
						<tr>
							<td>Name</td>
							<td>Email</td>
							<td>Password</td>
						</tr>
					</thead>
					<tbody>
						{users.map((row) => (
							<tr key={row._id}>
								<td>{row.Name}</td>
								<td>{row.Email}</td>
								<td>{row.Password}</td>
								<td>
									<button onClick={() => deleteuser(row._id)} className="btn btn-danger"><span className="glyphicon glyphicon-trash"></span></button>
									<button onClick={() => edituser(row._id)} className="btn btn-info"><span className="glyphicon glyphicon-pencil"></span></button>
									
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

		</div>

		</>
	)
}


export default Home;