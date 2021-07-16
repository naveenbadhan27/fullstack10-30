import React,{useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import Navbar from './navbar';
import Axios from 'axios';
import { func } from 'prop-types';
function Edit(){

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');
    // console.log(id);



	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');


function frmsubmit(){
    // console.log(name);
	Axios.post('http://localhost:30/updatedata', {
        id:id,
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
const [users, setUsers] = useState([]);

function getuserdata(){
	Axios.post('http://localhost:30/fetchdatas',{id:id}).then(function(succ){
		// console.log(succ.data)
		// setUsers(succ.data);
        setName(succ.data.Name);
        setEmail(succ.data.Email);
        setPassword(succ.data.Password);
	})
}

useEffect(() => {
	getuserdata();
}, [])





	return(
		<>
		<Navbar />
		<div className="col-lg-12">
			<div className="col-lg-4 col-lg-offset-2">
            <div className="form-group">
					<input type='text' id='name' className='form-control' onChange={(event) => {setName(event.target.value)}} placeholder="Fill your name"  value={name}/>
				</div>
				<div className="form-group">
					<input type='text' id='name' className='form-control' onChange={(event) => {setEmail(event.target.value)}} placeholder="Fill your Email" value={email}/>
				</div>
				<div className="form-group">
					<input type='text' id='name' className='form-control' onChange={(event) => {setPassword(event.target.value)}} placeholder="Fill your Password" value={password}/>
				</div>
				<div className="form-group">
					<button className="btn btn-info" onClick={frmsubmit}>Click</button>
				</div>
			</div>
		</div>

		</>
	)
}


export default Edit;