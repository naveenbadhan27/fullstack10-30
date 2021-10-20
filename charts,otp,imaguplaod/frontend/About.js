import React, { useEffect, useState } from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Card, CardContent, TextField, Button, Grid, CardMedia} from '@material-ui/core';
import Axios from 'axios';
import image from './ait.png';
function About(){

const history = useHistory();

function sendotp(){
	var email = document.getElementById('email').value;
	if(email == ''){
		alert('Please fill your emial');
	}else{
		Axios.post('http://localhost:30/sendOTP', {email:email}).then(function(succ) {
			// console.log(succ);
			if(succ.data == 'noemail'){
				alert('Sry this email is not registered');
			}else if(succ.data == 'error'){
				alert('Something went wrong, please try again later');
			}else{
				alert('Mail has been send, please check');
				// console.log(succ.data);
				var path = '/otp/?id='+succ.data._id;
				history.push(path);
			}
		})
	}
}
const [file, setFile] = useState();


function uploadimage(){
	const formData = new FormData();
	formData.append('file', file)
	Axios.post('http://localhost:30/uppp', formData , {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	}).then(function(succ){
		if(succ.data == true){
			alert('Image Inserted');
		}
	})
}

const [allimg, setAllimg] = useState([]);

function getAllImage(){
	Axios.get('http://localhost:30/getimage').then(function(succ){
		setAllimg(succ.data);
		console.log(succ.data);
	})
}

useEffect(() => {
	getAllImage();
}, [])

	return(
		<div>
			<h1>Welcome to About</h1>
			<Link to='/'>Home</Link>
			<Grid container>
			<Grid xs={4}>
				<h4 align="center">Forgot Password</h4>
				<CardContent>
					<TextField id='email' fullWidth label="Fill your Email" />
				</CardContent>
				<CardContent>
					<Button variant='contained' color='primary' onClick={sendotp}>Send OTP</Button>
				</CardContent>
			</Grid>
			<Grid xs={4}>
				<h4>Upload Image</h4>
				<CardContent>
					<TextField fullWidth id='image' type="file" onChange={(event) => {setFile(event.target.files[0])}} label="File Upload" />
				</CardContent>
				<CardContent>
					<Button variant='contained' color='secondary' onClick={uploadimage}>Submit</Button>
				</CardContent>

			</Grid>
			<Grid xs={4}>
				{allimg.map((row) => (
					<div key={row._id}>
						{row.imageName}
					</div>
				))}
			</Grid>
			</Grid>

		</div>
		)
}

export default About;