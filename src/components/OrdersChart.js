// src/components/OrdersChart.js
/*import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrdersChart = ({ data }) => {
  const chartData = {
    labels: data.map(order => order.createdAt.slice(0, 10)),
    datasets: [
      {
        label: 'Order Amount (DH)',
        data: data.map(order => order.orderAmount),
        backgroundColor: '#48ACFF',
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default OrdersChart;*/
