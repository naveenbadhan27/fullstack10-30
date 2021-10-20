import React,{useState, useEffect} from 'react';
import {CardContent, Grid, TextField, Card, Button, Typography} from '@material-ui/core';
import {Link} from 'react-router-dom';
import Axios from 'axios';

function Register(){

    const [username, setUsername] = useState('');
    const [useremail, setUseremail] = useState('');
    const [userpassword, setUserpassword] = useState('');
    const [usercontact, setUsercontact] = useState('');

    function registeruser(){
        Axios.post('http://localhost:1000/userregister', {
            name:username,
            email:useremail,
            password:userpassword,
            contact:usercontact,
        }).then(function(succ){
            console.log(succ)
            if(succ.data == true){
                localStorage.setItem('userlogin', useremail);
                window.location.href='/Home';
            }else{
                alert('Worng id or password');
            }
        })

    }


    return(
        <div>
            <Grid container>
                <Grid xs={3}></Grid>
                <Grid xs={6}>
                    <CardContent>
                    <Card >
                    <CardContent>
                        <Typography style={{textAlign:'center'}}>User Register</Typography>
                            <TextField fullWidth label="User Name" onChange={(event) => (setUsername(event.target.value))} />
                        </CardContent>
                        <CardContent>
                            <TextField fullWidth label="User Email" onChange={(event) => (setUseremail(event.target.value))} />
                        </CardContent>
                        <CardContent>
                            <TextField fullWidth label="User Password" onChange={(event) => (setUserpassword(event.target.value))} />
                        </CardContent>
                        <CardContent>
                            <TextField fullWidth label="User Contact" onChange={(event) => (setUsercontact(event.target.value))} />
                        </CardContent>
                        <CardContent>
                            <Button onClick={registeruser} variant="contained" color="primary">Login</Button>
                            if already a user click <Link to='/'>here</Link>
                        </CardContent>

                    </Card>
                    </CardContent>
                </Grid>



            </Grid>
        </div>
    )
}


export default Register;