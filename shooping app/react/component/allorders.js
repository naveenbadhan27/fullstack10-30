import React,{useState, useEffect} from 'react';
import {CardContent, Grid, TextField, Card, Button, Typography, Table, TableContainer, TableHead, TableBody, TableCell, TableRow} from '@material-ui/core';
import {Link} from 'react-router-dom';
import axios from 'axios';
function Allorders(){

    var session = localStorage.getItem('adminlogin');
    // console.log(session);
    if(session == null){
        window.location.href='/';
    }


    const [myorder, setMyorder] = useState([]);
    function getorders(){
        axios.post('http://localhost:1000/getallorder').then(function(succ){
            console.log(succ);
            setMyorder(succ.data);
        })
    }



    useEffect(() => {
        getorders()
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
                <Grid xs={12}>
                    <CardContent>
                    <Card >
                    {myorder.map((row) => (
                        <Grid container key={row._id}>
                            <Grid xs={4}>
                                {row.uname}<br/>
                                {row.uemail}
                            </Grid>
                            <Grid xs={4}>
                                Delivery Address - <br/>
                                Name - {row.del_name}<br/>
                                Contact - {row.del_contact}<br/>
                                Address - {row.del_address}<br/>
                            </Grid>
                            <Grid>
                                Product Details<br/>
                                Name - {row.pro_name}<br/>
                                Brand - {row.pro_brand}<br/>
                                Price - {row.pro_price}<br/>
                                Description - {row.pro_description}<br/>
                                Total - {row.pro_price + ' X ' +row.pro_qty} = {row.pro_price*row.pro_qty}<br/>
                            </Grid>
                        </Grid>
                    ))}




                    </Card>
                    </CardContent>
                </Grid>
            </Grid>
        </div>
    )
}


export default Allorders;