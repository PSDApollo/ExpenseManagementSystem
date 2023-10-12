import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';

import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';
import Home from './components/Home'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
