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

import { daysInMonth } from '~/utils/daysInMonth';

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

import { Bar } from 'react-chartjs-2';

export const BarVer = memo(function BarVer({
    revenueFormatForChart,
    time = 'year'
}) {
    let data = null;

    if (time === 'year') {
        const labelsYear = Array.from({ length: 12 }, (_, i) => {
            return `Tháng ${i + 1}`;
        });
        data = {
            labels: labelsYear,
            datasets: [
                {
                    label: 'Doanh thu trong năm',
                    data: revenueFormatForChart,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)'
                }
            ]
        };
    }
    if (time === 'month') {
        const labelsMonth = Array.from({ length: daysInMonth() }, (_, i) => {
            return `Ngày ${i + 1}`;
        });
        data = {
            labels: labelsMonth,
            datasets: [
                {
                    label: 'Doanh thu trong tháng',
                    data: revenueFormatForChart,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)'
                }
            ]
        };
    }
    if (time === 'week') {
        const labelsYear = Array.from({ length: 7 }, (_, i) => {
            return `Ngày ${i + 1}`;
        });
        data = {
            labels: labelsYear,
            datasets: [
                {
                    label: 'Doanh thu trong tuần',
                    data: revenueFormatForChart,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)'
                }
            ]
        };
    }

    return (
        <div className="rounded-xl bg-white p-4 shadow-card">
            {data && revenueFormatForChart && (
                <Bar data={data} options={options} />
            )}
        </div>
    );
});
