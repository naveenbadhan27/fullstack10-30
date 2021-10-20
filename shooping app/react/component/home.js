import React,{useState, useEffect} from 'react';
import {CardContent, Grid, TextField, Card, Button, Typography, Table, TableContainer, TableHead, TableBody, TableCell, TableRow} from '@material-ui/core';
import {Link} from 'react-router-dom';
import axios from 'axios';
import image from './icon.png'
function Home(){

    var session = localStorage.getItem('userlogin');
    // console.log(session);
    if(session == null){
        window.location.href='/';
    }

    const [proname, setProname] = useState('');
    const [probrand, setProbrand] = useState('');
    const [proprice, setProprice] = useState(0);
    const [prodescription, setProdescription] = useState('');

    const [getpro, setGetpro] = useState([]);
    function getprod(){
        axios.get('http://localhost:1000/allprodcuts').then(function(succ){
            setGetpro(succ.data);
        })
    }

    function addtocart(x){
        window.location.href='/Address/?id='+x;
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
                <Grid xs={12}>
                    <Grid container>
                        {getpro.map((row) => (
                                <Grid xs={2} key={row._id}>
                                    <img src={image} style={{maxWidth:'50%',}} />
                                    <Typography>{row.Name}</Typography>
                                    <Typography>{row.Brand}</Typography>
                                    <Typography>{row.Price}</Typography>
                                    <Typography>{row.Description}</Typography>
                                    <Button onClick={() => addtocart(row._id)} variant="outlined" color='secondary'>Add to Cart</Button>
                                </Grid>
                        ))}
                    </Grid>
                </Grid>


            </Grid>
        </div>
    )
}


export default Home;