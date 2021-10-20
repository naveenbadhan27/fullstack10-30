import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import { Chart } from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Grid } from '@material-ui/core';
function Home(){

const history = useHistory();

function changethis(){
	let path = `About`; 
    history.push(path);
}


const data = {
	labels: ['apple','mango','banana','orange'],
	datasets: [{
		backgroundColor:'maroon',
		label:'Products Qty',
		data: [10,20,15,2],
		hoverBackgroundColor:'green',
	}]
}


	return(
		<div>
			<h1>Welcome to Home</h1>
			<Link to='/About'>About</Link>
			<button onClick={changethis}>Click</button>

			<Grid container>
			<Grid xs={6}>

				<Line data={data} />

			</Grid>
			<Grid xs={6}>

				<Bar data={data} />

			</Grid>
			</Grid>




		</div>
		)
}

export default Home;