import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import AddFriends from './components/AddFriends';
import Home from './components/Home'; 
import Login from './components/Login';
import Signup from './components/Signup';
import ExpenseList from './components/ExpenseList'; 
import AddExpense from './components/AddExpense';   
import GraphicalDashboard from './components/graphical-dashboard/GraphicalDashboard';
import Profile from './components/Profile'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/expenselist" element={<ExpenseList />} /> 
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/" element={<Login/>} />  
          <Route path="/add-friends" element={<AddFriends />} />
          <Route path="/graphical-dashboard" element={<GraphicalDashboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;