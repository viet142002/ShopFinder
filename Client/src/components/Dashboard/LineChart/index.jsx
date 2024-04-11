import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    interaction: {
        mode: 'index',
        intersect: false
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            text: 'Nhập và bán ra'
        }
    },
    scales: {
        y: {
            type: 'linear',
            display: true,
            position: 'left'
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
                drawOnChartArea: false
            }
        }
    }
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
    labels,
    datasets: [
        {
            label: 'Bán',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'y'
        },
        {
            label: 'Nhập',
            data: [28, 48, 40, 19, 86, 27, 90],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            yAxisID: 'y1'
        }
    ]
};

function LineChart() {
    return (
        <div className="shadow-card rounded-xl bg-white p-4">
            <Line options={options} data={data} />
        </div>
    );
}

export default LineChart;
