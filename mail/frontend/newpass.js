import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Card, CardContent, TextField, Button, Grid} from '@material-ui/core';
import Axios from 'axios';

function Newpassword(){

const history = useHistory();

const queryString = window.location.search;
const urlParms = new URLSearchParams(queryString);
const id = urlParms.get('id');


function updatepassword(){
	var newpass = document.getElementById('newpass').value;
	var conpass = document.getElementById('conpass').value;
    // alert('yes');
	if(newpass == '' || conpass == ''){
		alert('Please fill your Password');
	}else{
		Axios.post('http://localhost:30/submitPassword', {newpass:newpass,uid:id}).then(function(succ) {
			// console.log(succ);
			if(succ.data == 'error'){
				alert('Please try again');
			}else if(succ.data == true){
				// alert('Yes');
				var path = '/About';
				history.push(path);
			}
		})
	}
}

function checkpass(){
    var newpass = document.getElementById('newpass').value;
    var conpass = document.getElementById('conpass').value;
    if(newpass == conpass){
        document.getElementById('btn').style.display = 'block';
    }else{
        document.getElementById('btn').style.display = 'none';
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
					<TextField type='password' onKeyUp={checkpass} id='newpass' fullWidth label="New Password" />
				</CardContent>
				<CardContent>
					<TextField type='password' onKeyUp={checkpass} id='conpass' fullWidth label="Confirm Password" />
				</CardContent>
				<CardContent>
					<Button variant='contained' id='btn' color='primary' onClick={updatepassword}>Update Password</Button>
				</CardContent>
			</Grid>

			</Grid>

		</div>
		)
}

export default Newpassword;