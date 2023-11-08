import React from 'react';
import BarChart from './BarChart';
import { Link } from 'react-router-dom';

const GraphicalDashboard = () => {
  return (
    <div>
    <div>
      <div className='barchart-container'>
      <BarChart />
      
      <Link to="/dashboard">
                  <button className="action-btn">Back to Dashboard</button>
              </Link>
      </div>
    </div>
    </div>
  );
};

export default GraphicalDashboard;