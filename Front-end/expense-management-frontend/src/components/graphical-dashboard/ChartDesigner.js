import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

export function ChartDesigner(chartRef, labels, type, datasets, options){
  if (process.env.NODE_ENV != 'test') { // Testing using canvas mock from jest
    const ctx = chartRef.current.getContext('2d');
    return new Chart(ctx, {
      type: type,
      data: {
        labels: labels,
        datasets:  datasets,
      },
      options: options, 
    });
  }
}

