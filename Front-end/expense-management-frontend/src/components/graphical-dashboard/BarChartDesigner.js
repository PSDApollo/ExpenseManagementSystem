import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { ChartDesigner } from './ChartDesigner';


export function BarChartDesigner(chartRef, labels, datasets, options){
  return ChartDesigner(chartRef, labels, 'bar', datasets, options)
 }

 
export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  
export function dataSetBuilder(label, data, backgroundColor){
    return {
         label: label,
         data: data,
         backgroundColor: backgroundColor,
       }
 }

 
export function optionBuilder(xTitle, xBeginAtZero, yTitle, yBeginAtZero, legend){
    return {
        scales: {
          x: {
            beginAtZero: xBeginAtZero,
            title: {
              display: true,
              text: xTitle,
            },
          },
          y: {
            beginAtZero: yBeginAtZero,
            title: {
              display: true,
              text: yTitle,
            },
          },
        },
        plugins: {
          legend: {
            display: legend, 
          },
        },
      }
}