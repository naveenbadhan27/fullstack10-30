import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Home';
import About from './About';
import Otp from './otp';
import Newpassword from './newpass';


function App() {
  return (
    <Router className="App">
      <Route path='/' exact component={Home} />
      <Route path='/about' component={About} />
      <Route path='/otp' component={Otp} />
      <Route path='/newpassword' component={Newpassword} />
    </Router>
  );
}

export default App;
