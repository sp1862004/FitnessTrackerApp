import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'animate.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, ArcElement, Title, Tooltip, Legend);

const Row1 = () => {
    const earningsData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Monthly Earnings',
                data: [1200, 1900, 3000, 1500, 2000, 2400, 3000], 
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
            {
                label: 'Earnings Trend',
                data: [1000, 1500, 2500, 1200, 2200, 2700, 2900],
                fill: false,
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.1,
            },
        ],
    };

    const pieData1 = {
        labels: ['Workshops', 'Conferences', 'Entertainment', 'Others'],
        datasets: [
            {
                label: 'Earnings Distribution',
                data: [4000, 3000, 2000, 1000],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(255, 205, 86, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                ],
            },
        ],
    };

    const pieData2 = {
        labels: ['Online', 'In-Person', 'Hybrid'],
        datasets: [
            {
                label: 'Earnings by Event Type',
                data: [5000, 3000, 2000],
                backgroundColor: [
                    'rgba(255, 205, 86, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
            },
        ],
    };

    const totalEarnings = earningsData.datasets[0].data.reduce((acc, curr) => acc + curr, 0);

    return (
        <div className='container mt-5 mb-5'>
            {/* Earnings Overview Section */}
            <div className="border rounded p-4 mt-5">
                <h4 className="text-center mb-4">Earnings Overview</h4>
                <h5 className="text-center">Total Earnings: ${totalEarnings}</h5>

                <div className="mt-4">
                    <Bar
                        data={earningsData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Monthly Earnings',
                                },
                            },
                        }}
                        style={{ height: '400px', width: '100%' }}
                    />
                </div>

                {/* Line Chart */}
                <div className="mt-4">
                    <Line
                        data={lineData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: 'Earnings Trend Over Time',
                                },
                            },
                        }}
                        style={{ height: '400px', width: '100%' }}
                    />
                </div>

                <div className='row'>
                    <div className='col-6'>
                        {/* First Pie Chart: Earnings Distribution */}
                        <div className="mt-4">
                            <Pie
                                data={pieData1}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                        },
                                        title: {
                                            display: true,
                                            text: 'Earnings Distribution by Category',
                                        },
                                    },
                                }}
                                style={{ height: '400px', width: '100%' }}
                            />
                        </div>
                    </div>
                    <div className='col-6'>
                        {/* Second Pie Chart: Earnings by Event Type */}
                        <div className="mt-4">
                            <Pie
                                data={pieData2}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                        },
                                        title: {
                                            display: true,
                                            text: 'Earnings by Event Type',
                                        },
                                    },
                                }}
                                style={{ height: '400px', width: '100%' }}
                            />
                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
}

export default Row1;
