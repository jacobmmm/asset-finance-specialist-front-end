import logo from './logo.svg';
import './App.css';
// import Login from './pages/login';
import Home from './pages/home';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Login from './pages/login';
import Registration from './pages/registration';
// import Registration from './pages/registration';
// import MusclePlan from './pages/muscleplan';
// import PlanExcercise from './pages/planExcercise';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Router>
      <Routes>
      <Route index element={<Home />} /> 
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Registration />} />
      {/*<Route path="/muscleplan" element={<MusclePlan/>} />
      <Route path="/muscleplan/excercises" element={<PlanExcercise />} /> */}
      
      </Routes>
      </Router>
  );
}

export default App;
