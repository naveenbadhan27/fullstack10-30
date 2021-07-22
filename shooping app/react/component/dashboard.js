import React,{useState, useEffect} from 'react';
import {CardContent, Grid, TextField, Card, Button, Typography, Table, TableContainer, TableHead, TableBody, TableCell, TableRow} from '@material-ui/core';
import {Link} from 'react-router-dom';
import axios from 'axios';
function Dashboard(){

    var session = localStorage.getItem('adminlogin');
    // console.log(session);
    if(session == null){
        window.location.href='/';
    }

    const [proname, setProname] = useState('');
    const [probrand, setProbrand] = useState('');
    const [proprice, setProprice] = useState(0);
    const [prodescription, setProdescription] = useState('');

    function addproduct(){
        axios.post('http://localhost:1000/insertpro', {
            proname:proname,
            probrand:probrand,
            proprice:proprice,
            prodescription:prodescription
        }).then(function(success){
            getprod();
        })
    }

    const [getpro, setGetpro] = useState([]);
    function getprod(){
        axios.get('http://localhost:1000/allprodcuts').then(function(succ){
            setGetpro(succ.data);
        })
    }

    useEffect(() => {
        getprod()
    }, []);

    function logout(){
        localStorage.removeItem('adminlogin');
        window.location.href='/';
    }


    return(
        <div>
            <Grid container>
                <Grid xs={12}>
                    <Button variant='contained' color='secondary' onClick={logout}>Logout</Button>
                    <Link to='/allorder'>Orders</Link>
                </Grid>
                <Grid xs={4}>
                    <CardContent>
                    <Card >
                    <CardContent>
                            <TextField fullWidth label="Product Name" onChange={(event) => (setProname(event.target.value))} />
                        </CardContent>
                        <CardContent>
                            <TextField fullWidth label="Product Brand" onChange={(event) => (setProbrand(event.target.value))} />
                        </CardContent>
                        <CardContent>
                            <TextField fullWidth label="Product Price" onChange={(event) => (setProprice(event.target.value))} />
                        </CardContent>
                        <CardContent>
                            <TextField fullWidth label="Product Description" onChange={(event) => (setProdescription(event.target.value))} />
                        </CardContent>
                        <CardContent>
                            <Button onClick={addproduct} variant="contained" color="primary">Add Product</Button>
                        </CardContent>

                    </Card>
                    </CardContent>
                </Grid>

                <Grid xs={8}>
                    <Card>
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Brand</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Description</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {getpro.map((row) => (
                                <TableRow key={row._id}>
                                    <TableCell>{row.Name}</TableCell>
                                    <TableCell>{row.Brand}</TableCell>
                                    <TableCell>{row.Price}</TableCell>
                                    <TableCell>{row.Description}</TableCell>
                                </TableRow>
                            ))}

                            </TableBody>
                        </Table>
                        </TableContainer>
                    </Card>
                </Grid>


            </Grid>
        </div>
    )
}


export default Dashboard;