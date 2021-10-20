import React,{useState, useEffect} from 'react';
import {CardContent, Grid, TextField, Card, Button, Typography, Table, TableContainer, TableHead, TableBody, TableCell, TableRow} from '@material-ui/core';
import {Link} from 'react-router-dom';
import axios from 'axios';
function Address(){

    var session = localStorage.getItem('userlogin');
    // console.log(session);
    if(session == null){
        window.location.href='/';
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const id = urlParams.get('id');

    const [proname, setProname] = useState('');
    const [probrand, setProbrand] = useState('');
    const [proprice, setProprice] = useState(0);
    const [prodescription, setProdescription] = useState('');



    const [uname, setUname] = useState('');
    const [ucontact, setUcontact] = useState('');
    const [uaddress, setUaddress] = useState('');
    const [qty, setQty] = useState('');


    function placeorder(){
        axios.post('http://localhost:1000/placeorder', {
            uname:uname,
            ucontact:ucontact,
            uaddress:uaddress,
            qty:qty,
            uid:session,
            pid:id
        }).then(function(success){
            if(success.data == true){
                alert('Order Placed');
                window.location.href='/orders';
            }
        })
    }

    function getprod(){
        axios.post('http://localhost:1000/getprodcuts',{id:id}).then(function(succ){
            setProname(succ.data.Name);
            setProprice(succ.data.Price);
            setProbrand(succ.data.Brand);
            setProdescription(succ.data.Description);
        })
    }

    useEffect(() => {
        getprod()
    }, []);

    function logout(){
        localStorage.removeItem('userlogin');
        window.location.href='/';
    }


    return(
        <div>
            <Grid container>
                <Grid xs={12}>
                    <Button variant='contained' color='secondary' onClick={logout}>Logout</Button>
                </Grid>
                <Grid xs={4}>
                    <CardContent>
                    <Card >
                    <CardContent>
                            <TextField fullWidth label="User Name" onChange={(event) => (setUname(event.target.value))} />
                        </CardContent>
                        <CardContent>
                            <TextField fullWidth label="User Contact" onChange={(event) => (setUcontact(event.target.value))} />
                        </CardContent>
                        <CardContent>
                            <TextField fullWidth label="User Address" onChange={(event) => (setUaddress(event.target.value))} />
                        </CardContent>
                        <CardContent>
                            <TextField type="number" fullWidth label="Pro Qty" onChange={(event) => (setQty(event.target.value))} />
                        </CardContent>
                        <CardContent>
                            <Button onClick={placeorder} variant="contained" color="primary">Place Order</Button>
                        </CardContent>

                    </Card>
                    </CardContent>
                </Grid>

                <Grid xs={4}>
                    <Card>
                        <CardContent>
                            <Typography >{proname}</Typography>
                            <Typography >{probrand}</Typography>
                            <Typography >{proprice}</Typography>
                            <Typography >{prodescription}</Typography>
                        </CardContent>
                    </Card>
                </Grid>


            </Grid>
        </div>
    )
}


export default Address;