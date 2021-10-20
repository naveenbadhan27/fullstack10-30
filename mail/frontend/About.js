import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Card, CardContent, TextField, Button, Grid} from '@material-ui/core';
import Axios from 'axios';

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



	return(
		<div>
			<h1>Welcome to About</h1>
			<Link to='/'>Home</Link>
			<Grid container>
			<Grid xs={4}></Grid>
			<Grid xs={4}>
				<h4 align="center">Forgot Password</h4>
				<CardContent>
					<TextField id='email' fullWidth label="Fill your Email" />
				</CardContent>
				<CardContent>
					<Button variant='contained' color='primary' onClick={sendotp}>Send OTP</Button>
				</CardContent>
			</Grid>

			</Grid>

		</div>
		)
}

export default About;