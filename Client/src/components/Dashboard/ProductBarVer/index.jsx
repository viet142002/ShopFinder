import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { memo } from 'react';

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
            text: 'Sản phẩm bán nhiều trong năm'
        }
    }
};

const labels = [
    'Product 1',
    'Product 2',
    'Product 3',
    'Product 4',
    'Product 5',
    'Product 6',
    'Product 7',
    'Product 8',
    'Product 9',
    'Product 10'
];

const data = {
    labels,
    datasets: [
        {
            label: 'Sản phẩm bán chạy',
            data: [65, 59, 80, 81, 56, 55, 40, 30, 20, 10],
            backgroundColor: 'rgba(0, 143, 251, 0.6)'
        }
    ]
};

import { Bar } from 'react-chartjs-2';

export const ProductBarVer = memo(function ProductBarVer({ dataChart }) {
    let data = null;
    if (dataChart) {
        data = {
            labels: dataChart.map((item) => item.product.name),
            datasets: [
                {
                    label: 'Sản phẩm bán chạy',
                    data: dataChart.map((item) => item.totalQuantity),
                    backgroundColor: 'rgba(0, 143, 251, 0.6)'
                }
            ]
        };
    }
    return (
        <div className="rounded-xl bg-white p-4 shadow-card">
            {dataChart && <Bar data={data} options={options} />}
        </div>
    );
});
