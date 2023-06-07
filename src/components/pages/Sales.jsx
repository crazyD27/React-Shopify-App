import React, { useRef, useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import axios from 'axios';
import { API } from '../../config/Api';

import './pages.scss';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function createGradient(ctx, area) {
  const colors = [
    'red',
    'orange',
    'yellow',
    'lime',
    'green',
    'teal',
    'blue',
    'purple',
  ];

  const colorStart = colors[Math.floor(Math.random() * colors.length)];
  let colorMid = colors[Math.floor(Math.random() * colors.length)];
  while (colorMid === colorStart) {
    colorMid = colors[Math.floor(Math.random() * colors.length)];
  }
  let colorEnd = colors[Math.floor(Math.random() * colors.length)];
  while (colorEnd === colorStart || colorEnd === colorMid) {
    colorEnd = colors[Math.floor(Math.random() * colors.length)];
  }

  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(0.5, colorMid);
  gradient.addColorStop(1, colorEnd);

  return gradient;
}

function Sales() {
  const token = localStorage.getItem("Token");
  const chartSalesRef = useRef(null);
  const chartOrdersRef = useRef(null);
  const [chartSalesData, setChartSalesData] = useState({
    labels: [],
    datasets: [],
  });
  const [chartOrdersData, setChartOrdersData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const chartSales = chartSalesRef.current;

    if (!chartSales) {
      return;
    }

    const updatedSalesData = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      datasets: [
        {
          label: 'Sales Data',
          data: [],
          backgroundColor: createGradient(chartSales.ctx, chartSales.chartArea),
        },
      ],
    };

    setChartSalesData(updatedSalesData);
  }, []);

  useEffect(() => {
    const chartOrders = chartOrdersRef.current;

    if (!chartOrders) {
      return;
    }

    const updatedOrdersData = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      datasets: [
        {
          label: 'Order Data',
          data: [],
          backgroundColor: createGradient(chartOrders.ctx, chartOrders.chartArea),
        },
      ],
    };

    setChartOrdersData(updatedOrdersData);
  }, []);

  useEffect(() => {
    axios
      .get(API.BASE_URL + 'analytics/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then(function (response) {
        const analyticsData = response.data;
        const updatedSalesData = {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          datasets: [
            {
              label: 'Sales Data',
              data: analyticsData.sales_data,
              backgroundColor: createGradient(chartSalesRef.current?.ctx, chartSalesRef.current?.chartArea),
            },
          ],
        };

        const updatedOrdersData = {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          datasets: [
            {
              label: 'Order Data',
              data: analyticsData.order,
              backgroundColor: createGradient(chartOrdersRef.current?.ctx, chartOrdersRef.current?.chartArea),
            },
          ],
        };

        setChartSalesData(updatedSalesData);
        setChartOrdersData(updatedOrdersData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="sales p-4 page">
        <div className="sales-container">
          <h2 className="my-5">Sales overview</h2>
          <div className="earnings-list d-flex flex-column justify-content-center align-items-center">
              <h4 className='text-left w-100 d-flex ps-5'>Sales Data</h4>
            <Chart className='mb-5' ref={chartSalesRef} type="line" data={chartSalesData} />
            <h4 className='text-left w-100 d-flex ps-5 mt-4'>Order Data</h4>
            <Chart ref={chartOrdersRef} type="line" data={chartOrdersData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Sales;

