import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Card, CardContent, TextField, Button, Grid} from '@material-ui/core';
import Axios from 'axios';

function Otp(){

const history = useHistory();

const queryString = window.location.search;
const urlParms = new URLSearchParams(queryString);
const id = urlParms.get('id');


function sendotp(){
	var otp = document.getElementById('otp').value;
	if(otp == ''){
		alert('Please fill your OTP');
    }else if(otp.length != 6){
        alert('Please fill valid OTP');
	}else{
		Axios.post('http://localhost:30/submitOTP', {otp:otp,uid:id}).then(function(succ) {
			// console.log(succ);
			if(succ.data == 'error'){
				alert('Sry this OTP is not valid');
			}else if(succ.data == true){
				// alert('Yes');
				var path = '/newpassword/?id='+id;
				history.push(path);
			}
		})
	}
}



	return(
		<div>
			<h1>Welcome to Otp</h1>
			<Grid container>
			<Grid xs={4}></Grid>
			<Grid xs={4}>
				<h4 align="center">Enter OTP</h4>
				<CardContent>
					<TextField type='number' id='otp' fullWidth label="Fill your OTP" />
				</CardContent>
				<CardContent>
					<Button variant='contained' color='primary' onClick={sendotp}>Submit OTP</Button>
				</CardContent>
			</Grid>

			</Grid>

		</div>
		)
}

export default Otp;