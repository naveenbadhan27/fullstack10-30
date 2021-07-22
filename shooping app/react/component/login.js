import React,{useState, useEffect} from 'react';
import {CardContent, Grid, TextField, Card, Button, Typography} from '@material-ui/core';
import { Link } from 'react-router-dom';
import Axios from 'axios';

function Login(){

    const [adminemail, setAdminemail] = useState('');
    const [adminpassword, setAdminpassword] = useState('');

    const [useremail, setUseremail] = useState('');
    const [userpassword, setUserpassword] = useState('');


    function adminlogin(){
        Axios.post('http://localhost:1000/adminlogin', {
            email:adminemail,
            password:adminpassword
        }).then(function(succ){
            console.log(succ)
            if(succ.data == true){
                localStorage.setItem('adminlogin', adminemail);
                window.location.href='/Dashboard';
                // alert('true');
            }else{
                alert('Worng id or password');
            }
        })
    }

    function userlogin(){
        Axios.post('http://localhost:1000/userlogin', {
            email:useremail,
            password:userpassword
        }).then(function(succ){
            console.log(succ)
            if(succ.data == true){
                localStorage.setItem('userlogin', useremail);
                window.location.href='/Home';
                // alert('true');
            }else{
                alert('Worng id or password');
            }
        })
    }



    return(
        <div>
            <Grid container>
              <Grid xs={6}>
                <CardContent>
                    <Card>
                    <CardContent>
                        <Typography style={{textAlign:'center'}}>Admin Login</Typography>
                            <TextField fullWidth label="Admin Email" onChange={(event) => (setAdminemail(event.target.value))} />
                        </CardContent>
                        <CardContent>
                            <TextField fullWidth label="Admin Password" onChange={(event) => (setAdminpassword(event.target.value))} />
                        </CardContent>
                        <CardContent>
                            <Button onClick={adminlogin} variant="contained" color="primary">Login</Button>
                        </CardContent>

                    </Card>
                </CardContent>
            </Grid>


                <Grid xs={6}>
                    <CardContent>
                    <Card >
                    <CardContent>
                        <Typography style={{textAlign:'center'}}>User Login</Typography>
                            <TextField fullWidth label="User Email" onChange={(event) => (setUseremail(event.target.value))} />
                        </CardContent>
                        <CardContent>
                            <TextField fullWidth label="User Password" onChange={(event) => (setUserpassword(event.target.value))} />
                        </CardContent>
                        <CardContent>
                            <Button onClick={userlogin} variant="contained" color="primary">Login</Button>
                            if new user click <Link to='Register'>here</Link>
                        </CardContent>

                    </Card>
                    </CardContent>
                </Grid>



            </Grid>
        </div>
    )
}


export default Login;