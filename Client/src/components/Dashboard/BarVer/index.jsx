import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top'
        },
        title: {
            display: true,
            text: 'Doanh thu trong năm'
        }
    }
};

const labels = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
];

const data = {
    labels,
    datasets: [
        {
            label: 'Đơn hàng trong tháng',
            data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 10, 5, 2],
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
    ]
};

import { Bar } from 'react-chartjs-2';

function BarVer() {
    return (
        <div className="shadow-card rounded-xl bg-white p-4">
            <Bar data={data} options={options} />
        </div>
    );
}

export default BarVer;
