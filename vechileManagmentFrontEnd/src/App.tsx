import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './home';
import Dashboard from './dashboard';
import './App.css';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
