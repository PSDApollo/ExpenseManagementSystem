import React from 'react';
import BarChart from './BarChart';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';

const GraphicalDashboard = () => {
  return (
    <Box p={3} id='graphical-dashboard'>
      <div className='barchart-container'>
        <BarChart />
        <Box textAlign="center" mt={2}>
          <Link to="/dashboard">
            <button variant="contained" className="action-btn" style={{ width: '300px' }}>
              Back to Dashboard
            </button>
          </Link>
        </Box>
      </div>
    </Box>
  );
};

export default GraphicalDashboard;
