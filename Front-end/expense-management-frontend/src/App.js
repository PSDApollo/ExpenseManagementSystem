import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';

import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';
import Home from './components/Home'; 
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
