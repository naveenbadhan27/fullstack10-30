import React from 'react';
import './App.css';
import HomePage from './component/home';
import AboutPage from './component/about';
import {Link,Route, BrowserRouter as Router} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <>
    <Router>
      <Route path='/' exact component={HomePage} />
      <Route path='/About' component={AboutPage} />
    </Router>
    </>
  );
}

export default App;